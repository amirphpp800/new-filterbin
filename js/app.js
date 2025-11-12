
// Main Application
class App {
    constructor() {
        this.components = {
            header: null,
            hero: null,
            articlesFeatured: null,
            footer: null
        };
    }

    async init() {
        // Initialize components
        this.components.header = new HeaderComponent();
        this.components.hero = new HeroComponent();
        this.components.articlesFeatured = new ArticlesFeaturedComponent();
        this.components.footer = new FooterComponent();

        // Mount components
        this.components.header.mount('#header-root');
        this.components.hero.mount('#hero-root');
        await this.components.articlesFeatured.mount('#articles-root');
        this.components.footer.mount('#footer-root');

        // Initialize smooth scroll
        this.initSmoothScroll();

        // Initialize lazy loading
        this.initLazyLoading();
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href !== '#contact') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});
