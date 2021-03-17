/* eslint-disable no-restricted-globals */

import {
  files,
  // routes,
  // shell,
  timestamp, // eslint-disable-line no-unused-vars
} from '@sapper/service-worker'; // eslint-disable-line import/no-unresolved

import { cachablePaths } from './pageData';

// Array of shell files will be injected here from service-worker-files-inject.mjs during build
const shellFilesToCache = '--SHELL-FILES--';
const assetsToCache = files.filter((a) => a.endsWith('.webp') || a.endsWith('.png') || a.endsWith('.svg'));

const filesToCache = shellFilesToCache.concat(assetsToCache, cachablePaths);

const assetCache = `assets${timestamp}`;
// const dynamicCache = 'dynamicCache';

self.addEventListener('install', (event) => {
  console.log('SW: install event');
  event.waitUntil(
    caches
      .open(assetCache)
      .then((cache) => cache.addAll(filesToCache))
      .then(() => {
        self.skipWaiting();
      }),
  );
  // event.waitUntil(async () => {
  //   caches
  //     .open(dynamicCache)
  //     .then((cache) => {
  //       retucache.addAll(filesToCache)
  //     })
  //     .then(() => {
  //       self.skipWaiting();
  //     });
  // });
});

self.addEventListener('activate', (event) => {
  console.log('SW: activate event');

  event.waitUntil(
    caches.keys().then(async (keys) => {
      // Delete old caches
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        if (key !== assetCache) {
          // eslint-disable-next-line no-await-in-loop
          await caches.delete(key);
          console.log('SW: deleted cache ', key);
        }
      }

      self.clients.claim();
    }),
  );
});

self.addEventListener('fetch', (event) => {
  // Do not handle other than GET requests
  if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

  const url = new URL(event.request.url);

  // Don't try to handle e.g. data: URIs
  if (!url.protocol.startsWith('http')) return;

  // Ignore dev server requests
  // if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

  if (event.request.cache === 'only-if-cached') return;

  // Network first, falling back to
  // Cache if the user is offline
  //
  // For HTML files and API GET repsonses
  if (event.request.mode === 'navigate' || event.request.url.includes('/api/')) {
    event.respondWith(
      caches.open(assetCache).then(async (cache) => {
        // For navigate requests (HTML files), remove query parameters
        url.search = event.request.mode === 'navigate' ? '' : url.search;
        try {
          const response = await fetch(url);
          cache.put(url, response.clone());
          console.log('[SW 1]: Serving fresh version and storing into cache: ', url.pathname);

          return response;
        } catch (err) {
          const response = await cache.match(url);
          if (response) {
            console.log('[SW 1]: Fetch failed, serving cached response: ', url.pathname);
            return response;
          }

          console.log('[SW 1]: Fetch failed, not in cache, throwing: ', url.pathname);
          throw err;
        }
      }),
    );
    return;
  }
  // Cache first approach for all other files
  // Check cache and serve cahced file or fall back to network
  // and save reauested file into cache upon successfull response
  event.respondWith(
    caches.open(assetCache).then(async (cache) => {
      const cacheResponse = await cache.match(url);

      if (cacheResponse) {
        console.log('[SW 2]: Found in cache, serving:', url.pathname);
        return cacheResponse;
      }
      try {
        const networkResponse = await fetch(event.request);
        cache.put(event.request, networkResponse.clone());
        console.log('[SW 2]: Not in cache, tried network:', url.pathname);
        return networkResponse;
      } catch (err) {
        console.log('[SW 2]: Not in cache, fetch failed, throwing:', url.pathname);
        throw err;
      }
    }),
  );
});
