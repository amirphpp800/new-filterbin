/**
 * Optimized App Bundle for FilterBin
 * Version: 2.0
 * Performance Optimized
 */

// Utility Functions
const Utils = {
    // Debounce function for scroll events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for resize events
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Lazy load images with IntersectionObserver
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                        }
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                            img.removeAttribute('data-srcset');
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            document.querySelectorAll('img[data-src], img[data-srcset]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    },

    // Preload critical resources
    preloadResources() {
        const criticalResources = [
            { href: '/css/style.css', as: 'style' },
            { href: '/assets/Font/fontiran.css', as: 'style' },
            { href: '/assets/logo/logotype.svg', as: 'image' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.as === 'font') {
                link.crossOrigin = 'anonymous';
            }
            document.head.appendChild(link);
        });
    },

    // Check WebP support
    async checkWebPSupport() {
        const webP = new Image();
        webP.onload = webP.onerror = function () {
            const isSupported = webP.height === 2;
            document.documentElement.classList.add(isSupported ? 'webp' : 'no-webp');
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }
};

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
    }

    init() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            // Observe Largest Contentful Paint
            try {
                const lcpObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
                });
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP observation not supported');
            }

            // Observe First Input Delay
            try {
                const fidObserver = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        this.metrics.fid = entry.processingStart - entry.startTime;
                    });
                });
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID observation not supported');
            }

            // Observe Cumulative Layout Shift
            try {
                let clsValue = 0;
                const clsObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    this.metrics.cls = clsValue;
                });
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('CLS observation not supported');
            }
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Optimized Component Loader
class ComponentLoader {
    constructor() {
        this.components = new Map();
        this.loadedComponents = new Set();
    }

    register(name, component) {
        this.components.set(name, component);
    }

    async load(name, selector) {
        if (this.loadedComponents.has(name)) {
            console.warn(`Component ${name} already loaded`);
            return;
        }

        const Component = this.components.get(name);
        if (!Component) {
            console.error(`Component ${name} not found`);
            return;
        }

        const element = document.querySelector(selector);
        if (!element) {
            console.error(`Element ${selector} not found`);
            return;
        }

        try {
            const instance = new Component();
            if (instance.mount) {
                await instance.mount(selector);
            } else {
                element.innerHTML = instance.render();
                if (instance.attachEvents) {
                    instance.attachEvents();
                }
            }
            this.loadedComponents.add(name);
        } catch (error) {
            console.error(`Error loading component ${name}:`, error);
        }
    }

    async loadAll(components) {
        const promises = components.map(({ name, selector }) => 
            this.load(name, selector)
        );
        await Promise.all(promises);
    }
}

// Service Worker Registration
class ServiceWorkerManager {
    static async register() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('Service Worker registered:', registration);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available
                            if (confirm('نسخه جدیدی از سایت موجود است. آیا می‌خواهید صفحه را بازخوانی کنید؟')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }
}

// Optimized Main App
class OptimizedApp {
    constructor() {
        this.componentLoader = new ComponentLoader();
        this.performanceMonitor = new PerformanceMonitor();
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        // Start performance monitoring
        this.performanceMonitor.init();

        // Check WebP support
        Utils.checkWebPSupport();

        // Preload critical resources
        Utils.preloadResources();

        // Register service worker
        ServiceWorkerManager.register();

        // Initialize components when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initComponents());
        } else {
            await this.initComponents();
        }

        // Setup lazy loading
        Utils.lazyLoadImages();

        // Setup smooth scrolling with debounce
        this.setupSmoothScroll();

        // Setup responsive handlers with throttle
        this.setupResponsiveHandlers();

        this.initialized = true;
    }

    async initComponents() {
        // Register all components
        if (typeof HeaderComponent !== 'undefined') {
            this.componentLoader.register('header', HeaderComponent);
        }
        if (typeof HeroComponent !== 'undefined') {
            this.componentLoader.register('hero', HeroComponent);
        }
        if (typeof ArticlesListComponent !== 'undefined') {
            this.componentLoader.register('articles', ArticlesListComponent);
        }
        if (typeof FooterComponent !== 'undefined') {
            this.componentLoader.register('footer', FooterComponent);
        }

        // Load components based on page
        const componentsToLoad = [];
        
        if (document.querySelector('#header-root')) {
            componentsToLoad.push({ name: 'header', selector: '#header-root' });
        }
        if (document.querySelector('#hero-root')) {
            componentsToLoad.push({ name: 'hero', selector: '#hero-root' });
        }
        if (document.querySelector('#articles-root')) {
            componentsToLoad.push({ name: 'articles', selector: '#articles-root' });
        }
        if (document.querySelector('#footer-root')) {
            componentsToLoad.push({ name: 'footer', selector: '#footer-root' });
        }

        await this.componentLoader.loadAll(componentsToLoad);
    }

    setupSmoothScroll() {
        const smoothScroll = (e) => {
            const href = e.currentTarget.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80; // Header height
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });
    }

    setupResponsiveHandlers() {
        const handleResize = Utils.throttle(() => {
            const width = window.innerWidth;
            document.documentElement.setAttribute('data-viewport', 
                width < 768 ? 'mobile' : 
                width < 1024 ? 'tablet' : 'desktop'
            );
        }, 250);

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }

    // Public method to get performance metrics
    getPerformanceMetrics() {
        const metrics = this.performanceMonitor.getMetrics();
        const navigation = performance.getEntriesByType('navigation')[0];
        
        if (navigation) {
            metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
            metrics.loadComplete = navigation.loadEventEnd - navigation.loadEventStart;
        }

        return metrics;
    }
}

// Initialize app
const app = new OptimizedApp();

// Start initialization
app.init().catch(error => {
    console.error('App initialization failed:', error);
});

// Export for debugging
window.FilterBinApp = app;

// Log performance metrics after load
window.addEventListener('load', () => {
    setTimeout(() => {
        const metrics = app.getPerformanceMetrics();
        console.log('Performance Metrics:', metrics);
    }, 2000);
});
