// Offline support for the website version of Study Timer.
// The page itself: network first (so updates show up), cached copy when offline.
// Firebase library files: cached forever (their URLs include the version).
// Firebase's own sign-in and database traffic is never cached here; Firestore
// has its own offline cache.
const CACHE = 'study-timer-v2';
// Keep the version in sync with `V` in index.html.
const FIREBASE = ['firebase-app.js', 'firebase-auth.js', 'firebase-firestore.js']
  .map(f => `https://www.gstatic.com/firebasejs/10.12.2/${f}`);
// Firebase files are fetched up front too, so the first visit is enough to work offline.
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon.svg', ...FIREBASE];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/')) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    })));
    return;
  }

  if (url.origin !== location.origin) return;

  e.respondWith(fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true })
    .then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()))));
});
