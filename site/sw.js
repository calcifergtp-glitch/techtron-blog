<<<<<<< HEAD
self.addEventListener('install',e=>{e.waitUntil(caches.open('tt-v1').then(c=>c.addAll(['./','./index.html'])))});self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
=======
self.addEventListener('install',e=>self.skipWaiting()); self.addEventListener('fetch',()=>{});
>>>>>>> b35f2b9 (deploy: TechTron fixed4 — long-form posts + Home nav fix)
