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

const dynamicCache = `cache${timestamp}`;

self.addEventListener('install', (event) => {
  console.log('SW: install event');
  event.waitUntil(
    caches
      .open(dynamicCache)
      .then((cache) => cache.addAll(filesToCache))
      .then(() => {
        self.skipWaiting();
      }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('SW: activate event');

  event.waitUntil(
    caches.keys().then(async (keys) => {
      // Delete old caches
      // eslint-disable-next-line no-restricted-syntax
      for (const key of keys) {
        if (key !== dynamicCache) {
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
  if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

  if (event.request.cache === 'only-if-cached') return;

  // For everything else, try the network first, falling back to
  // Cache if the user is offline. (If the pages never change, you
  // Might prefer a cache-first approach to a network-first one.)
  if (event.request.url.endsWith('.json')) {
    event.respondWith(
      caches.open(dynamicCache).then(async (cache) => {
        try {
          const response = await fetch(event.request);
          cache.put(event.request, response.clone());
          console.log('SW getting fresh version and storing into cache', event.request.url);

          return response;
        } catch (err) {
          const response = await cache.match(event.request);
          console.log('SW serving cached response: ', event.request.url);
          if (response) return response;

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
    caches.open(dynamicCache).then(async (cache) => {
      const cacheResponse = await cache.match(event.request);

      if (cacheResponse) {
        console.log('SW serving cached response:', event.request.url);
        return cacheResponse;
      }

      const networkResponse = await fetch(event.request);
      cache.put(event.request, networkResponse.clone());
      console.log('SW saved into cache and serving from network:', event.request.url);
      return networkResponse;
    }),
  );
});
