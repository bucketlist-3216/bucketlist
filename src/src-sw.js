workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  /https:\/\/bucketlist-pwa\.herokuapp\.com/,
  new workbox.strategies.NetworkFirst({
    cacheName: "bucketlist-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
);

workbox.routing.registerRoute(
  /localhost\:5000/,
  new workbox.strategies.NetworkFirst({
    cacheName: "localhost-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 24 * 60 * 60 // 1 day
      })
    ]
  })
);

workbox.routing.registerRoute(
  /https:\/\//,
  new workbox.strategies.NetworkFirst({
    cacheName: 'misc1-cache',
    plugins: [
      new workbox.expiration.Plugin({
        statuses: [0, 200],
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

workbox.routing.registerRoute(
  /http:\/\//,
  new workbox.strategies.NetworkFirst({
    cacheName: 'misc2-cache',
    plugins: [
      new workbox.expiration.Plugin({
        statuses: [0, 200],
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
      }),
    ],
  })
);

addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    skipWaiting();
  }
});