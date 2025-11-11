/**
 * Service Worker for FilterBin
 * Version: 1.0.0
 * Features: Offline support, Cache management, Performance optimization
 */

const CACHE_NAME = 'filterbin-v1';
const RUNTIME_CACHE = 'filterbin-runtime';

// Files to cache immediately
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/components.css',
    '/js/app.js',
    '/js/components/header.js',
    '/js/components/footer.js',
    '/js/components/hero.js',
    '/js/components/articles-list.js',
    '/assets/Font/fontiran.css',
    '/assets/logo/logotype.svg',
    '/assets/logo/logo.svg',
    '/config/offline.html'
];

// Install event - cache essential files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching essential files');
                return cache.addAll(PRECACHE_URLS.map(url => {
                    return new Request(url, { cache: 'reload' });
                }));
            })
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error('Cache installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        return cacheName.startsWith('filterbin-') && cacheName !== CACHE_NAME;
                    })
                    .map(cacheName => {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch strategies
const fetchStrategies = {
    // Cache First - for static assets
    cacheFirst: async (request) => {
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(request);
        
        if (cached) {
            return cached;
        }

        try {
            const response = await fetch(request);
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            return caches.match('/config/offline.html');
        }
    },

    // Network First - for API calls and dynamic content
    networkFirst: async (request) => {
        const cache = await caches.open(RUNTIME_CACHE);
        
        try {
            const response = await fetch(request);
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        } catch (error) {
            const cached = await cache.match(request);
            if (cached) {
                return cached;
            }
            return caches.match('/config/offline.html');
        }
    },

    // Stale While Revalidate - for frequently updated content
    staleWhileRevalidate: async (request) => {
        const cache = await caches.open(RUNTIME_CACHE);
        const cached = await cache.match(request);
        
        const fetchPromise = fetch(request).then(response => {
            if (response.ok) {
                cache.put(request, response.clone());
            }
            return response;
        });

        return cached || fetchPromise;
    }
};

// Fetch event - handle requests with appropriate strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-HTTP(S) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }

    // Skip cross-origin requests
    if (url.origin !== self.location.origin) {
        return;
    }

    // Determine strategy based on request type
    let strategy;
    
    if (request.method !== 'GET') {
        // Only cache GET requests
        return;
    }

    // Static assets - Cache First
    if (url.pathname.match(/\.(css|js|woff2?|ttf|otf|svg|png|jpg|jpeg|gif|webp)$/)) {
        strategy = fetchStrategies.cacheFirst;
    }
    // HTML pages - Network First
    else if (url.pathname.match(/\.html$/) || url.pathname === '/') {
        strategy = fetchStrategies.networkFirst;
    }
    // API calls - Network First
    else if (url.pathname.startsWith('/api/')) {
        strategy = fetchStrategies.networkFirst;
    }
    // Articles data - Stale While Revalidate
    else if (url.pathname.startsWith('/data/articles/')) {
        strategy = fetchStrategies.staleWhileRevalidate;
    }
    // Default - Network First
    else {
        strategy = fetchStrategies.networkFirst;
    }

    event.respondWith(strategy(request));
});

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'sync-articles') {
        event.waitUntil(syncArticles());
    }
});

async function syncArticles() {
    try {
        const response = await fetch('/api/articles/sync');
        if (response.ok) {
            console.log('Articles synced successfully');
        }
    } catch (error) {
        console.error('Sync failed:', error);
    }
}

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data ? event.data.text() : 'مطلب جدیدی منتشر شد',
        icon: '/assets/logo/logo.svg',
        badge: '/assets/logo/badge.svg',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'مشاهده',
                icon: '/assets/icons/checkmark.svg'
            },
            {
                action: 'close',
                title: 'بستن',
                icon: '/assets/icons/close.svg'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('فیلتربین', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for cache management
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
    
    if (event.data.action === 'clearCache') {
        event.waitUntil(
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            })
        );
    }
});
