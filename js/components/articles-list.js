// Articles List Component - Enhanced with Auto-Discovery
class ArticlesListComponent {
    constructor(options = {}) {
        this.articles = [];
        this.maxArticles = options.maxArticles || 50; // حداکثر تعداد مقالات برای جستجو
        this.useJsonConfig = options.useJsonConfig !== false; // استفاده از فایل JSON در صورت وجود
    }

    async loadArticles() {
        try {
            // تشخیص اینکه در کدام صفحه هستیم
            const isSubPage = window.location.pathname.includes('/pages/');
            const basePath = isSubPage ? '../' : '';
            
            // اول سعی می‌کنیم فایل JSON را بخوانیم (اختیاری)
            if (this.useJsonConfig) {
                try {
                    const jsonResponse = await fetch(`${basePath}data/articles/articles.json`);
                    if (jsonResponse.ok) {
                        const articlesData = await jsonResponse.json();
                        await this.loadFromJSON(articlesData, basePath);
                        return;
                    }
                } catch (err) {
                    console.log('JSON config not found, using auto-discovery...');
                }
            }
            
            // اگر فایل JSON نبود، خودکار فایل‌ها را پیدا می‌کنیم
            await this.autoDiscoverArticles(basePath);
            
        } catch (error) {
            console.error('Error loading articles:', error);
            this.articles = [];
        }
    }

    async autoDiscoverArticles(basePath) {
        // جستجوی خودکار برای پیدا کردن تمام فایل‌های مقاله
        const articleFiles = [];
        
        // تلاش برای بارگذاری تا maxArticles مقاله
        for (let i = 1; i <= this.maxArticles; i++) {
            articleFiles.push(`${basePath}data/articles/article-${i}.html`);
        }

        const promises = articleFiles.map(file => 
            fetch(file)
                .then(res => {
                    if (!res.ok) throw new Error('File not found');
                    return res.text();
                })
                .then(html => this.parseArticleFromHTML(html, file))
                .catch(() => null) // بدون نمایش خطا برای فایل‌های پیدا نشده
        );

        const results = await Promise.all(promises);
        this.articles = results.filter(article => 
            article !== null && 
            article.title !== 'بدون عنوان' &&
            article.title.trim() !== '' &&
            article.id !== 'ARTICLE_ID' // فایل تمپلیت را نادیده بگیر
        );
        
        // مرتب‌سازی بر اساس ID (جدیدترین اول)
        this.articles.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        
        console.log(`✅ تعداد ${this.articles.length} مقاله یافت شد`);
    }

    async loadFromJSON(articlesData, basePath) {
        // بارگذاری از فایل JSON
        const promises = articlesData.articles.map(articleInfo => {
            // چک کردن اینکه مقاله active باشد (پیش‌فرض true)
            if (articleInfo.active === false) {
                return Promise.resolve(null);
            }
            const file = `${basePath}data/articles/${articleInfo.file}`;
            return fetch(file)
                .then(res => {
                    if (!res.ok) throw new Error('File not found');
                    return res.text();
                })
                .then(html => this.parseArticleFromHTML(html, file))
                .catch((err) => {
                    console.warn(`Failed to load ${file}:`, err);
                    return null;
                });
        });

        const results = await Promise.all(promises);
        this.articles = results.filter(article => article !== null);
        
        // مرتب‌سازی بر اساس ID (جدیدترین اول)
        this.articles.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        
        console.log(`✅ تعداد ${this.articles.length} مقاله از JSON بارگذاری شد`);
    }

    parseArticleFromHTML(html, filePath) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const article = doc.querySelector('article');
        
        if (!article) return null;
        
        const id = article.getAttribute('data-id');
        const category = article.getAttribute('data-category');
        const date = article.getAttribute('data-date');
        const excerpt = article.getAttribute('data-excerpt');
        const tags = article.getAttribute('data-tags');
        const readingTime = article.getAttribute('data-reading-time');
        
        const titleElement = article.querySelector('.article-body-title');
        const imageElement = article.querySelector('.article-image');
        
        // اصلاح مسیر تصویر
        let imageSrc = imageElement ? imageElement.getAttribute('src') : '/assets/images/default.png';
        if (imageSrc.startsWith('/')) {
            const isSubPage = window.location.pathname.includes('/pages/');
            imageSrc = (isSubPage ? '..' : '.') + imageSrc;
        }
        
        // ساخت لینک صحیح
        const fileName = filePath.split('/').pop();
        const isSubPage = window.location.pathname.includes('/pages/');
        const articleLink = isSubPage ? `../data/articles/${fileName}` : `data/articles/${fileName}`;
        
        return {
            id: id || filePath.match(/article-(\d+)/)?.[1] || '1',
            title: titleElement ? titleElement.textContent.trim() : 'بدون عنوان',
            excerpt: excerpt || 'خلاصه‌ای موجود نیست',
            image: imageSrc,
            date: date || 'تاریخ نامشخص',
            category: category || 'عمومی',
            readingTime: readingTime || '5',
            link: articleLink,
            tags: tags ? tags.split(',').map(t => t.trim()) : []
        };
    }

    render() {
        if (this.articles.length === 0) {
            return '';
        }
        
        const featuredArticle = this.articles[0];
        const sidebarArticles = this.articles.slice(1, 6);
        
        return `
            <section class="featured-articles-section">
                <div class="container">
                    <div class="featured-articles-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                            <path d="M7 7h10"></path>
                            <path d="M7 12h10"></path>
                            <path d="M7 17h6"></path>
                        </svg>
                        <h2>یادداشت‌های پیشنهادی</h2>
                    </div>
                    <div class="featured-articles-grid">
                        ${this.renderFeaturedCard(featuredArticle)}
                        ${this.renderSidebarArticles(sidebarArticles)}
                    </div>
                </div>
            </section>
        `;
    }

    renderFeaturedCard(article) {
        return `
            <a href="${article.link}" class="main-featured-card" style="text-decoration: none;">
                <div class="featured-card-header">
                    <div class="featured-card-pattern"></div>
                    <div class="featured-card-icon-container">
                        <div class="featured-icon-circle">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 8v8"></path>
                                <path d="M8 12h8"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="featured-card-badge">نیمه مهر تا نیمه آبان</div>
                    <div class="featured-card-year">۱۴۰۴</div>
                    <div class="featured-badge-container">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                            <circle cx="12" cy="12" r="4" fill="#fff"></circle>
                        </svg>
                    </div>
                </div>
                <div class="featured-card-content">
                    <div class="featured-card-meta">
                        <span>${article.category}</span>
                        <span>•</span>
                        <span>${article.date}</span>
                    </div>
                    <h3 class="featured-card-title">${article.title}</h3>
                    <div class="featured-card-action">
                        <span>ادامه مطلب</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </div>
                </div>
            </a>
        `;
    }
    
    renderSidebarArticles(articles) {
        if (articles.length === 0) {
            return '';
        }
        
        return `
            <div class="sidebar-articles-list">
                ${articles.map(article => `
                    <a href="${article.link}" class="sidebar-article-card">
                        <div class="sidebar-article-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                                <path d="M7 7h10"></path>
                                <path d="M7 12h7"></path>
                            </svg>
                        </div>
                        <div class="sidebar-article-content">
                            <h4 class="sidebar-article-title">${article.title}</h4>
                            <div class="sidebar-article-meta">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span>${article.date}</span>
                            </div>
                        </div>
                    </a>
                `).join('')}
            </div>
        `;
    }

    getSpecialCategoryClass(category) {
        // دسته‌بندی‌هایی که باید افکت شیشه‌ای داشته باشند
        const glassCategories = ['شبکه و سیاستگذاری', 'شبکه و سیاست گذاری'];
        
        if (glassCategories.includes(category)) {
            return 'glass-effect';
        }
        
        return '';
    }

    async mount(selector) {
        await this.loadArticles();
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = this.render();
            this.attachEvents();
        }
    }

    attachEvents() {
        // Add animation on scroll
        const articleCards = document.querySelectorAll('.article-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        articleCards.forEach(card => observer.observe(card));
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticlesListComponent;
}
