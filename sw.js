
/**************************************************
 * 파크골프 참가 신청 PWA
 * Service Worker
 * 2026.11.23
 **************************************************/

const CACHE_NAME = 'parkgolf-pwa-v1';

const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './parkgolf-192.png',
  './parkgolf-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});
