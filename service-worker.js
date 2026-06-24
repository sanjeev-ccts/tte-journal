const CACHE_NAME = 'tte-journal-v2.4'; // Change this number when you update index.html
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // Make sure you actually have an icon.png file in your GitHub!
];

// 1. Install Phase: Download the new files into the new box
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting()) // Forces the new version to activate immediately
  );
});

// 2. Activate Phase: The Cleanup Crew (Deletes old version boxes)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName); // Throws away v1.1 when v1.2 arrives
          }
        })
      );
    })
  );
  return self.clients.claim(); // Takes control of the screen immediately
});

// 3. Fetch Phase: How it serves the app to your phone
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return the cached version if found, otherwise fetch from the internet
        return response || fetch(event.request);
      })
  );
});
