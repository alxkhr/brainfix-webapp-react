const swVersion = '04';
const cacheVersion = '03';

self.addEventListener('install', async (event) => {
  console.log(`webapp.sw.js: v${swVersion} is installing.`);
  await event.waitUntil(initCache());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log(`webapp.sw.js: v${swVersion} is activating.`);
  event.waitUntil(deleteOutdatedCaches());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(cachedFetch(event.request));
});

async function initCache() {
  const cache = await caches.open(cacheVersion);
  return await cache.addAll(['/', '/index.html', '/bundle.js']);
}

async function deleteOutdatedCaches() {
  const cacheKeys = await caches.keys();
  const deletePromises = cacheKeys
    .filter((key) => key !== cacheVersion)
    .map((key) => caches.delete(key));
  return Promise.all(deletePromises);
}

async function cachedFetch(request) {
  // check for browser development tools requests
  if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
    console.log('webapp.sw.js: dev tool request not handled', request.url);
    return new Response(
      'Hello i am your service worker, i guess you just opened dev tools and i cannot handle your request. So sorry!',
    );
  }
  // check for API requests
  if (request.url.includes('/api/')) {
    console.log('webapp.sw.js: api request', request.url);
    return await fetch(request);
  }
  // fetch from cache if exists
  const cache = await caches.open(cacheVersion);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    console.log('webapp.sw.js: cache responding', request.url);
    return cachedResponse;
  }
  // fetch from remote
  const response = await fetch(request);
  if (response.ok) {
    return response;
  }
  // fallback response TODO differentiate between requests (navigation, image, etc.)
  console.log('webapp.sw.js: unable to fetch', request.url, response.status, response.statusText);
  return new Response('Oops!');
}
