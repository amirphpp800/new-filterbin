// Hero Component
class HeroComponent {
    constructor() {
        this.featuredArticle = {
            id: 1,
            title: 'از اینترنت طبقاتی تا اعلام شروط رفع فیلتر تلگرام؛ اجرای گام به گام مصوبه‌ای که انتشار عمومی نیافت',
            date: '۱۶ آبان ۱۴۰۴',
            category: 'شبکه و سانسورگذاری',
            image: 'assets/images/network.png',
            link: '/article/1' // Added link property
        };

        this.sideArticles = [
            {
                id: 1,
                title: 'هوشمند‌سازی علیه حقوق شهروندان (بخش دوم)',
                date: '۱۴ آبان ۱۴۰۴',
                image: 'assets/images/ai.png',
                link: '/article/2' // Added link property
            },
            {
                id: 2,
                title: 'رویکرد چندبعدی ابزار جمهوری اسلامی برای نظارت بر فضای دیجیتال',
                date: '۱۲ آبان ۱۴۰۴',
                image: 'assets/images/network.png',
                link: '/article/3' // Added link property
            },
            {
                id: 3,
                title: 'کنترل به جای نوآوری؛ روایت توسعه نامتوازن هوش مصنوعی در ایران',
                date: '۱۸ مهر ۱۴۰۴',
                image: 'assets/images/ai.png',
                link: '/article/4' // Added link property
            },
            {
                id: 4,
                title: 'ماه‌ها ساعت اختلال در یک ماه؛ اینترنت ایران زیر فشار خودتخریبی',
                date: '۱۲ مهر ۱۴۰۴',
                image: 'assets/images/network.png',
                link: '/article/5' // Added link property
            }
        ];
    }

    render() {
        return `
            <section class="hero-section">
                <div class="container">
                    <div class="hero-layout">
                        <div class="hero-featured">
                            <a href="${this.featuredArticle.link}" class="featured-card">
                                <div class="featured-image-placeholder">
                                    <div class="featured-badge">
                                        <div class="featured-label">
                                            <span class="label-text">نیمه مهر تا نیمه آبان</span>
                                            <span class="label-number">۱۴۰۴</span>
                                        </div>
                                        <div class="label-icon">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="featured-content">
                                    <div class="featured-meta">
                                        <span class="meta-cat">${this.featuredArticle.category}</span>
                                        <span class="meta-date">${this.featuredArticle.date}</span>
                                    </div>
                                    <h1 class="featured-title">${this.featuredArticle.title}</h1>
                                    <span class="featured-btn">
                                        ادامه‌مطلب
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 5 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div class="hero-sidebar">
                            <div class="sidebar-header">
                                <h2 class="sidebar-title">یادداشت‌های پیشنهادی</h2>
                                <svg class="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>
                            </div>
                            <div class="sidebar-articles">
                                ${this.renderSideArticles()}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    renderSideArticles() {
        return this.sideArticles.map(article => `
            <a href="${article.link}" class="sidebar-article">
                <img src="${article.image}" alt="${article.title}" class="article-thumb" loading="lazy">
                <div class="article-info">
                    <h4 class="article-title">${article.title}</h4>
                    <div class="article-meta">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span class="article-date">${article.date}</span>
                    </div>
                </div>
            </a>
        `).join('');
    }

    mount(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = this.render();
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroComponent;
}