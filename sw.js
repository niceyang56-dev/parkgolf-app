/**************************************************
 * 파크골프 참가 신청 PWA
 * Service Worker
 * 2026.11.25 개선
 *
 * - 참가 신청 전용 아이콘 적용
 * - 캐시 버전 v2 → v3 갱신
 * - 이전 버전 캐시 자동 삭제
 * - 기존 대회별 URL 유지
 **************************************************/

const CACHE_NAME = "parkgolf-pwa-v3";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./parkgolf-entry-192.png",
  "./parkgolf-entry-512.png"
];

/**************************************************
 * 1. 서비스 워커 설치
 **************************************************/
self.addEventListener("install", event => {

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_FILES))
  );

  self.skipWaiting();
});

/**************************************************
 * 2. 서비스 워커 활성화
 * - 이전 캐시 삭제
 **************************************************/
self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys
          .filter(key =>
            key.startsWith("parkgolf-pwa-") &&
            key !== CACHE_NAME
          )
          .map(key => caches.delete(key))

      );

    }).then(() => self.clients.claim())

  );
});
