var CACHE_NAME = 'Cache-v1';


// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        if (cache.keys.length === 0) {
          console.log("ServiceWorker: Loading cache from asset-manifest.json");
          return fetch('asset-manifest.json').then(function (response) {
            return response.json();
          }).then(function (files) {
            var filesArray = Object.keys(files).map(function (k) { return files[k] });
            filesArray.push("asset-manifest.json");
            filesArray.push("sw.js");
            console.log('[install] Adding files from JSON file: ', filesArray);
            return cache.addAll(filesArray);
          });
        }else{
          console.log("ServiceWorker: Cache is already present");
        }

      })
      .then(function () {
        console.log(
          '[install] All required resources have been cached;',
          'the Service Worker was successfully installed!'
        );
        // eslint-disable-next-line no-restricted-globals
        return self.skipWaiting();
      }).catch((err) => {
        console.log('Error while loading cache:', err);
      })
  );

});



// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function (response) {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function (cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', function (event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1', CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        // eslint-disable-next-line array-callback-return
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log("Deleting cache: ", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});