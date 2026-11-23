/* Techinfigo client portal — push notifications service worker. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let d = {};
  try { d = (event.data && event.data.json().data) || {}; } catch (_) {}
  const title = d.title || 'Techinfigo';
  const body = d.body || 'You have a new update.';
  const tag = d.tag || 'portal';
  const link = d.link || '/portal';
  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      icon: '/proposal-logo.png',
      badge: '/proposal-logo.png',
      data: { link },
      vibrate: [80, 40, 80],
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const link = (event.notification.data && event.notification.data.link) || '/portal';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) { if (c.url.includes('/portal') && 'focus' in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow(link);
    }),
  );
});
