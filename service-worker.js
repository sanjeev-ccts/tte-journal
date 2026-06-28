const CACHE_NAME = 'tte-tracker-v2.3';
const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json'
];

// 1. INSTALL PHASE: Cache new files and bypass the waiting phase
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Instantly force the new version to install
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
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

// 3. FETCH PHASE: Always try the network first to get fresh data, fall back to offline cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match('./index.html');
        })
    );
});