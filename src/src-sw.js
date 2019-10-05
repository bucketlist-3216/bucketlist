workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  /https:\/\/bucketlist-pwa\.herokuapp\.com\/api\/v1/,
  new workbox.strategies.NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
);

workbox.routing.registerRoute(
  /http:\/\/localhost\:5000\/user/,
  new workbox.strategies.NetworkFirst({
    cacheName: "user-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('/\.(?:png|gif|jpg|jpeg|webp|svg)$'),
  //\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'image-cache',
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