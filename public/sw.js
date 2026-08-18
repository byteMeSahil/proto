// Kriya Service Worker — Offline + Cache support
const CACHE_NAME = "kriya-v1";
const STATIC_ASSETS = [
  "/",
  "/schemes",
  "/track",
  "/grievance",
  "/helplines",
  "/manifest.json",
];

// Install: pre-cache shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: Network-first for API, Cache-first for static
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // API calls: network-only (no caching of live data)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(request).catch(() =>
      new Response(JSON.stringify({ error: "offline", message: "You are offline. Please reconnect." }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    ));
    return;
  }

  // Static + pages: stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);
      const networkFetch = fetch(request).then((res) => {
        if (res.ok) cache.put(request, res.clone());
        return res;
      }).catch(() => cached);
      return cached ?? networkFetch;
    })
  );
});

// Background sync for offline grievance submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-grievances") {
    event.waitUntil(syncOfflineGrievances());
  }
});

async function syncOfflineGrievances() {
  // Retrieve stored offline grievances from IndexedDB and POST them
  console.log("[Kriya SW] Syncing offline grievances…");
}
