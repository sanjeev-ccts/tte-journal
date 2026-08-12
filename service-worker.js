const CACHE_NAME = 'tte-tracker-v4.3';
const CORE_ASSETS = [
    './index.html',
    './roster.html',
    './i18n.js',
    './manifest.json', 
    './icon.png?v=3',
    './logo.png'
];
const EXTERNAL_ASSETS = [
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js',
    'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js'
];

// 1. INSTALL PHASE: Cache new files and bypass the waiting phase
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Instantly force the new version to install
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            // Core same-origin assets must all succeed — if any of these fails, installation
            // fails and the app keeps running on whatever version was previously installed.
            return cache.addAll(CORE_ASSETS).then(() => {
                // External Firebase SDK files are best-effort: a transient CDN failure here
                // shouldn't break caching of the core app. If this fails, the app still works
                // online, and offline support for auth/data will just need one successful
                // online run before it's available. This is what makes the ES module <script>
                // imports in index.html (firebase-app.js, firebase-database.js, firebase-auth.js)
                // resolve even with no network — without this, ANY of those failing offline
                // takes down the entire module, and every window.* function it defines with it,
                // which is why the app previously wouldn't open at all when offline.
                return Promise.all(
                    EXTERNAL_ASSETS.map((url) =>
                        cache.add(url).catch(() => {})
                    )
                );
            });
        })
    );
});

// 2. ACTIVATE PHASE: Delete old caches and take control
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // If the cache name doesn't match our current version, destroy it
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim(); // Immediately seize control of all open pages
        })
    );
});

// 3. FETCH PHASE: Always try the network first to get fresh data, fall back to cache offline.
// Point: the index.html fallback is scoped to page NAVIGATIONS only. Previously it applied to
// EVERY failed request — meaning a failed script/data fetch (e.g. an uncached Firebase SDK file,
// or any other resource) would silently get index.html's HTML content back instead of a clean
// failure. For a <script> tag that's a broken, confusing failure mode rather than an honest one.
// Sub-resource requests now just fail cleanly if they're not cached, which is the correct,
// debuggable behavior — and it's what makes the "not available offline" case distinguishable
// from "broken".
// Point (timeout fix): fetch() has no built-in timeout. Some Android WebViews don't reliably
// reject a fetch() promise when genuinely offline — it can just hang indefinitely instead of
// failing fast, which meant the .catch() cache fallback below was NEVER running; the page just
// sat waiting for a network response that would only ever arrive once real connectivity returned.
// Racing fetch() against a short manual timeout forces a fallback to cache instead of hanging.
// Point (critical fix): this handler used to intercept EVERY request the page makes — including
// live Firebase Auth/Database API calls (identitytoolkit.googleapis.com, firebaseio.com, etc.)
// that were never meant to be cached at all. When one of those failed offline, our own fallback
// logic caught it and returned a synthetic Response.error() instead of letting it fail naturally.
// Firebase's SDK needs a REAL network failure to correctly detect "offline" and fall back to its
// own persisted session — handing it our synthetic error response instead broke that internal
// logic and left onAuthStateChanged hanging forever, which is why the splash screen never cleared
// even once index.html and its assets were correctly cached. Now this handler only touches
// requests it actually manages (this app's own files, plus the 3 Firebase SDK script files it
// explicitly precaches); everything else — all live API/auth/database traffic — passes straight
// through untouched, exactly as if no service worker were present for those requests at all.
const FETCH_TIMEOUT_MS = 4000;
function timeoutAfter(ms) {
    return new Promise((_, reject) => setTimeout(() => reject(new Error('fetch timeout')), ms));
}

function isManagedRequest(url) {
    if (url.origin === self.location.origin) return true;
    return EXTERNAL_ASSETS.includes(url.href.split('?')[0]) || EXTERNAL_ASSETS.includes(url.href);
}

self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // Not a file we manage (e.g. Firebase Auth/Database API calls) — let the browser handle
    // it completely normally, with no interception at all.
    if (!isManagedRequest(url)) return;

    event.respondWith(
        Promise.race([fetch(event.request), timeoutAfter(FETCH_TIMEOUT_MS)]).catch(() => {
            return caches.match(event.request).then((cached) => {
                if (cached) return cached;
                if (event.request.mode === 'navigate') return caches.match('./index.html');
                return Response.error();
            });
        })
    );
});
