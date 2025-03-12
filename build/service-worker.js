const CACHE_NAME = "filmfreakz-cache-v1";
const urlsToCache = [ "/",
"/index.html",
"/offline.html",
"/static/css/main.bec12f80.css",  
"/static/js/main.337f6fb9.js",
"/favicon.ico",
"/logo192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).catch((error) => {
        console.error('Fetch failed; returning offline page instead.', error);

        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html');
        }
      });
    })
  );
});


self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
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

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll([
        "/", 
        "/index.html", 
        "/manifest.json", 
        "/offline.html",  
        "/logo192.png", 
        "/logo512.png"
      ]);
    })
  );
});
