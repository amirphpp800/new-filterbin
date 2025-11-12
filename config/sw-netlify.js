const CACHE_VERSION = 'filterbin-v2';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

// فایل‌های استاتیک که باید کش شوند
const STATIC_ASSETS = [
    '/',
    '/about',
    '/articles',
    '/bpb-guide',
    '/iran-off',
    '/internet-toolkit',
    '/messaging-toolkit',
    '/css/style.css',
    '/css/components.css',
    '/css/article.css',
    '/css/bpb-guide.css',
    '/js/app.js',
    '/js/components/header.js',
    '/js/components/footer.js',
    '/js/components/hero.js',
    '/js/components/navigation.js',
    '/js/components/breadcrumb.js',
    '/js/components/articles-list.js',
    '/assets/Font/fontiran.css',
    '/assets/logo/logo.svg',
    '/assets/logo/logotype.svg',
    '/data/articles/articles.json',
    '/config/offline.html',
    '/config/manifest.json'
];

// نصب Service Worker
self.addEventListener('install', event => {
    console.log('[SW] Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(STATIC_ASSETS.map(url => {
                    return new Request(url, { cache: 'reload' });
                }));
            })
            .then(() => {
                console.log('[SW] Static assets cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('[SW] Cache installation failed:', error);
            })
    );
});

// فعال‌سازی و پاک کردن کش‌های قدیمی
self.addEventListener('activate', event => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(cacheName => {
                            return cacheName.startsWith('filterbin-') &&
                                   cacheName !== STATIC_CACHE &&
                                   cacheName !== DYNAMIC_CACHE &&
                                   cacheName !== IMAGE_CACHE;
                        })
                        .map(cacheName => {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[SW] Cache cleanup complete');
                return self.clients.claim();
            })
    );
});

// استراتژی‌های Fetch
const fetchStrategies = {
    // Network First - برای صفحات HTML
    networkFirst: async (request, cacheName = DYNAMIC_CACHE) => {
        const cache = await caches.open(cacheName);

        try {
            const response = await fetch(request);
            if (response && response.status === 200) {
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            const cached = await cache.match(request);
            if (cached) {
                return cached;
            }

            // اگر صفحه HTML است، صفحه آفلاین را نمایش بده
            if (request.destination === 'document') {
                return caches.match('/config/offline.html');
            }

            throw error;
        }
    },

    // Cache First - برای فایل‌های استاتیک
    cacheFirst: async (request, cacheName = STATIC_CACHE) => {
        const cache = await caches.open(cacheName);
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(request);
            if (response && response.status === 200) {
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            console.error('[SW] Fetch failed:', error);
            throw error;
        }
    },

    // Stale While Revalidate - برای تصاویر
    staleWhileRevalidate: async (request, cacheName = IMAGE_CACHE) => {
        const cache = await caches.open(cacheName);
        const cached = await cache.match(request);

        const fetchPromise = fetch(request)
            .then(response => {
                if (response && response.status === 200) {
                    cache.put(request, response.clone());
                }
                return response;
            })
            .catch(() => cached);

        return cached || fetchPromise;
    }
};

// مدیریت درخواست‌ها
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // فقط درخواست‌های HTTP/HTTPS
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // فقط درخواست‌های GET
    if (request.method !== 'GET') {
        return;
    }

    // تشخیص نوع درخواست و انتخاب استراتژی
    let strategy;

    // تصاویر - Stale While Revalidate
    if (request.destination === 'image' || url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) {
        strategy = fetchStrategies.staleWhileRevalidate(request, IMAGE_CACHE);
    }
    // فایل‌های CSS, JS, فونت - Cache First
    else if (url.pathname.match(/\.(css|js|woff2?|ttf|otf)$/i)) {
        strategy = fetchStrategies.cacheFirst(request, STATIC_CACHE);
    }
    // صفحات HTML و مسیرهای clean URL - Network First
    else if (request.destination === 'document' || url.pathname.match(/^\/(about|articles|bpb-guide|iran-off|internet-toolkit|messaging-toolkit)$/)) {
        strategy = fetchStrategies.networkFirst(request, DYNAMIC_CACHE);
    }
    // فایل‌های JSON - Network First
    else if (url.pathname.match(/\.json$/i)) {
        strategy = fetchStrategies.networkFirst(request, DYNAMIC_CACHE);
    }
    // پیش‌فرض - Network First
    else {
        strategy = fetchStrategies.networkFirst(request, DYNAMIC_CACHE);
    }

    event.respondWith(strategy);
});

// مدیریت پیام‌ها
self.addEventListener('message', event => {
    if (event.data && event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }

    if (event.data && event.data.action === 'clearCache') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        console.log('[SW] Clearing cache:', cacheName);
                        return caches.delete(cacheName);
                    })
                );
            }).then(() => {
                console.log('[SW] All caches cleared');
                return self.clients.matchAll();
            }).then(clients => {
                clients.forEach(client => {
                    client.postMessage({
                        action: 'cacheCleared',
                        message: 'تمام کش‌ها پاک شدند'
                    });
                });
            })
        );
    }
});

// Background Sync
self.addEventListener('sync', event => {
    if (event.tag === 'sync-data') {
        event.waitUntil(syncData());
    }
});

async function syncData() {
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        const response = await fetch('/data/articles/articles.json');
        if (response.ok) {
            await cache.put('/data/articles/articles.json', response.clone());
            console.log('[SW] Data synced successfully');
        }
    } catch (error) {
        console.error('[SW] Sync failed:', error);
    }
}