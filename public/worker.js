/// <reference lib="WebWorker" />

// TS compilation of this file needs Babel etc (not worth it) https://www.devextent.com/create-service-worker-typescript/
// // // export empty type because of tsc --isolatedModules flag
// // // export type {};
// // // declare const self: ServiceWorkerGlobalScope;

//name of your app
const CACHE_NAME = "pwa-birdstreak";
//include all routes used in app
const urlsToCache = ["/", "/list", "/logo.png", "/birdy1.webp", "/birdy2.webp", "/birdy3.webp", "/birdy4.webp", "/birdy5.webp", "/birdy6.webp"];

// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", (event) => {
  var cacheWhitelist = ["pwa-birdstreak"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
