/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope & typeof globalThis;
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, setCatchHandler } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

precacheAndRoute(self.__WB_MANIFEST);
cleanupOutdatedCaches();

// 缓存静态资源（图片、js、css等）
registerRoute(
    /\.(?:js|css|png|jpg|jpeg|svg|webp|woff2?)$/,
    new StaleWhileRevalidate({
        cacheName: 'static-resources',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 350,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 一周
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);

// 缓存 HTML 页面
registerRoute(
    /.*\.html.*/,
    new StaleWhileRevalidate({
        cacheName: 'html-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 150,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 一周
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);
registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'html-cache',
        networkTimeoutSeconds: 3,
        plugins: [
            new ExpirationPlugin({
                maxEntries: 10,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    }),
);

setCatchHandler(async ({ request }) => {
    if (request.destination === 'document') {
        const cache = await caches.open('html-cache');
        return (await cache.match('/offline.html')) || (await cache.match('/index.html')) || Response.error();
    }
    return Response.error();
});
