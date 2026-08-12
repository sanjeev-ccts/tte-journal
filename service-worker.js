const CACHE_NAME = 'tte-tracker-v3.3';

const CORE_ASSETS = [
    './index-1.html',
    './roster.html',
    './i18n.js',
    './manifest.json',
    './icon.png?v=3',
    './logo.png'
];

const FIREBASE_PREFIX =
    'https://www.gstatic.com/firebasejs/10.7.1/';

const FIREBASE_ENTRYPOINTS = [
    FIREBASE_PREFIX + 'firebase-app.js',
    FIREBASE_PREFIX + 'firebase-database.js',
    FIREBASE_PREFIX + 'firebase-auth.js'
];

const PDFJS_URL =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';


/* =========================
   INSTALL
   ========================= */

self.addEventListener('install', (event) => {

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME).then(async (cache) => {

            // Cache the app shell.
            // Each file is independent so one missing optional file
            // cannot prevent the service worker from installing.

            for (const url of CORE_ASSETS) {
                try {
                    await cache.add(url);
                } catch (e) {
                    console.log('Cache skipped:', url);
                }
            }

            // Cache Firebase entry modules.
            for (const url of FIREBASE_ENTRYPOINTS) {
                try {
                    await cache.add(url);
                } catch (e) {
                    console.log('Firebase cache skipped:', url);
                }
            }

            // Cache PDF.js used by the app.
            try {
                await cache.add(PDFJS_URL);
            } catch (e) {
                console.log('PDF.js cache skipped');
            }

        })

    );

});


/* =========================
   ACTIVATE
   ========================= */

self.addEventListener('activate', (event) => {

    event.waitUntil(

        caches.keys().then((cacheNames) => {

            return Promise.all(

                cacheNames.map((cacheName) => {

                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }

                })

            );

        }).then(() => {

            return self.clients.claim();

        })

    );

});


/* =========================
   FETCH HELPERS
   ========================= */

const FETCH_TIMEOUT_MS = 4000;


function timeoutAfter(ms) {

    return new Promise((_, reject) => {

        setTimeout(() => {
            reject(new Error('fetch timeout'));
        }, ms);

    });

}


function isManagedRequest(url) {

    // Our own GitHub Pages files.
    if (url.origin === self.location.origin) {
        return true;
    }

    // All Firebase browser modules and their imported chunks.
    if (url.href.startsWith(FIREBASE_PREFIX)) {
        return true;
    }

    // PDF.js.
    if (
        url.href === PDFJS_URL ||
        url.href.split('?')[0] === PDFJS_URL
    ) {
        return true;
    }

    return false;

}


/* =========================
   FETCH
   ========================= */

self.addEventListener('fetch', (event) => {

    // Only GET requests can be cached.
    if (event.request.method !== 'GET') {
        return;
    }

    const url = new URL(event.request.url);

    /*
       IMPORTANT:

       Firebase Auth/Realtime Database API requests such as

       identitytoolkit.googleapis.com
       firebaseio.com

       are NOT intercepted.

       Only the Firebase JavaScript library files are managed here.
    */

    if (!isManagedRequest(url)) {
        return;
    }


    event.respondWith(

        Promise.race([

            fetch(event.request),

            timeoutAfter(FETCH_TIMEOUT_MS)

        ])

        .then(async (response) => {

            /*
               Whenever a managed resource successfully loads online,
               save it.

               This also catches additional Firebase module/chunk files
               imported by firebase-app/database/auth.
            */

            if (response && response.ok) {

                const cache =
                    await caches.open(CACHE_NAME);

                await cache.put(
                    event.request,
                    response.clone()
                );

            }

            return response;

        })

        .catch(() => {

            /*
               INTERNET OFF:

               First try the exact requested resource from cache.
            */

            return caches.match(event.request)

                .then((cached) => {

                    if (cached) {
                        return cached;
                    }


                    /*
                       If this is a page navigation and the requested
                       resource isn't available, load the latest app shell.
                    */

                    if (event.request.mode === 'navigate') {

                        return caches.match('./index-1.html');

                    }


                    // Do not return index HTML for failed scripts/API calls.
                    return Response.error();

                });

        })

    );

});
