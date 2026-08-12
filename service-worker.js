const CACHE_NAME = "tte-offline-v3.2";

const APP_FILES = [
    "./",
    "./index.html",
    "./index-6.html",
    "./manifest.json",
    "./i18n.js",
    "./roster.html",
    "./icon.png",
    "./logo.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            for (const file of APP_FILES) {
                try {
                    await cache.add(file);
                } catch (error) {
                    console.log("Could not cache:", file);
                }
            }

            await self.skipWaiting();
        })
    );
});


self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});


self.addEventListener("fetch", (event) => {

    // Only handle GET requests
    if (event.request.method !== "GET") {
        return;
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {

                // Save successful requests for future offline use
                if (response && response.status === 200) {
                    const responseClone = response.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }

                return response;
            })
            .catch(() => {

                return caches.match(event.request).then((cachedResponse) => {

                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    // If the user is opening the app while offline,
                    // return the cached app HTML.
                    if (event.request.mode === "navigate") {
                        return caches.match("./index.html")
                            .then((indexFile) => {
                                if (indexFile) {
                                    return indexFile;
                                }

                                return caches.match("./index-6.html");
                            });
                    }

                    return new Response(
                        "Offline - resource not available in cache.",
                        {
                            status: 503,
                            headers: {
                                "Content-Type": "text/plain"
                            }
                        }
                    );
                });
            })
    );
});
