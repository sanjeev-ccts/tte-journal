const CACHE_NAME = 'tte-tracker-v2.8';
const CORE_ASSETS = [
    './index.html',
    './roster.html',
    './i18n.js',
    './manifest.json', 
    './icon.png', 
    './login-bg.png'
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
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request).then((cached) => {
                if (cached) return cached;
                if (event.request.mode === 'navigate') return caches.match('./index.html');
                return Response.error();
            });
        })
    );
});
