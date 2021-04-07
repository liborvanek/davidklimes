/* eslint-disable no-restricted-globals */

import {
  files,
  // routes,
  // shell,
  timestamp, // eslint-disable-line no-unused-vars
} from '@sapper/service-worker'; // eslint-disable-line import/no-unresolved

import { cachablePaths } from './pageData';

// Array of shell files (js + css) will be injected here from service-worker-files-inject.mjs
// during build
// All have hashed filename and are served from '/client/*'
const shellFilesToCache = '--SHELL-FILES--';
// Regex matching shell assets
const shellFilesPattern = /\/client\/(.+)/;
const staticFilesPattern = /\.(webp|png|svg)$/i;

// All files served from /static folder filtered by extension
const staticToCache = files.filter((a) => staticFilesPattern.test(a));

// API routes and navigation requests (html)
const dynamicToCache = cachablePaths;

const shellCache = 'shell';
const staticCache = 'static';
const dynamicCache = 'dynamic';

// Cache first then network
// [⚙️ CF]
// Check cache and serve cached file or fall back to network
// and save requested file into cache upon successfull response
function cacheFirst(event, url, cacheName) {
  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      const cacheResponse = await cache.match(url);
      if (cacheResponse) {
        console.log(`[⚙️ CF ${cacheName}]: Found in cache, serving:`, url.pathname);
        return cacheResponse;
      }
      try {
        const networkResponse = await fetch(event.request);
        cache.put(event.request, networkResponse.clone());
        console.log(`[⚙️ CF ${cacheName}]: Not in cache, tried network and saved:`, url.pathname);
        return networkResponse;
      } catch (err) {
        // catch is only triggered if an exception is thrown, which is likely
        // due to a network error.
        // If fetch() returns a valid HTTP response with a response code in
        // the 4xx or 5xx range, the catch() will NOT be called.
        console.log(`[⚙️ CF ${cacheName}]: Not in cache, fetch failed, throwing:`, url.pathname);
        throw err;
      }
    }),
  );
}

// Network first
// [⚙️ NF]
// Try to get fresh response from network first, fall back to cache if the user is offline
// For HTML files and API GET responses
function networkFirst(event, url, cacheName) {
  const requestUrl = url;
  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      // For navigate requests (HTML files), remove query parameters
      requestUrl.search = event.request.mode === 'navigate' ? '' : url.search;

      try {
        // Else, use the preloaded response, if it's there
        // See https://developers.google.com/web/updates/2017/02/navigation-preload#using_the_preloaded_response
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) return preloadResponse;

        const response = await fetch(requestUrl);
        cache.put(requestUrl, response.clone());
        console.log(`[⚙️ NF ${cacheName}]: Serving fresh version and storing into cache: `, requestUrl.pathname);

        return response;
      } catch (err) {
        const response = await cache.match(requestUrl);
        if (response) {
          console.log(`[⚙️ NF ${cacheName}]: Fetch failed, found and serving cached response: `, requestUrl.pathname);
          return response;
        }

        console.log(`[⚙️ NF ${cacheName}]: Fetch failed, not in cache, throwing: `, requestUrl.pathname);
        throw err;
      }
    }),
  );
}

console.log('[⚙️ ini]: initiated');
self.addEventListener('install', (event) => {
  console.log('[⚙️ inst]: installing');

  event.waitUntil(
    // Wait until all caches are prefilled
    Promise.all(
      [caches
        .open(shellCache)
        .then((cache) => cache.addAll(shellFilesToCache))
        .then(() => {
          console.log(`[⚙️ inst ${shellCache}]: cache filled with ${shellFilesToCache.length} files`);
        }),
      caches
        .open(staticCache)
        .then((cache) => cache.addAll(staticToCache))
        .then(() => {
          console.log(`[⚙️ inst ${staticCache}]: cache filled with ${staticToCache.length} files`);
        }),
      caches
        .open(dynamicCache)
        .then((cache) => cache.addAll(dynamicToCache))
        .then(() => {
          console.log(`[⚙️ inst ${dynamicCache}]: cache filled with ${dynamicToCache.length} files`);
        }),
      ],
    ).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  console.log('[⚙️ act]: activating');
  // This would be the place for cache cleanup, but we have so few resources we don't need that
  event.waitUntil(async function activateWaitUntil() {
    // https://developers.google.com/web/updates/2017/02/navigation-preload
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
    event.waitUntil(self.clients.claim());
  }());
});

// Get message with API paths to precache from _layout as soon as ⚙️ is active
self.addEventListener('message', (event) => {
  if (event.data && event.data.command === 'PRECACHE_API_CALLS') {
    const urlsToCache = event.data.paths;

    caches
      .open(dynamicCache)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => {
        console.log(`[⚙️ msg ${dynamicCache}]: ${urlsToCache.length} API calls precached`);
      });
  }
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

  if (shellFilesPattern.test(event.request.url)) {
    cacheFirst(event, url, shellCache);
    return;
  }
  if (staticFilesPattern.test(event.request.url)) {
    cacheFirst(event, url, staticCache);
    return;
  }
  networkFirst(event, url, dynamicCache);
});
