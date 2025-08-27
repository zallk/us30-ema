self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('us30-ema-v1').then(cache => cache.addAll([
      './',
      './index.html',
      './manifest.webmanifest',
      './icons/192.png',
      './icons/512.png'
    ]))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

// Optional push hook if you later wire Web Push (server needed)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'US30 EMA Alert', body: 'New signal' };
  event.waitUntil(
    self.registration.showNotification(data.title || 'US30 EMA Alert', {
      body: data.body || '',
      icon: './icons/192.png',
      badge: './icons/192.png'
    })
  );
});
