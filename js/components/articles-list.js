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
        return `
            <section class="articles-section">
                <div class="container">
                    <div class="articles-grid">
                        ${this.renderArticles()}
                    </div>
                </div>
            </section>
        `;
    }

    renderArticles() {
        if (this.articles.length === 0) {
            return `
                <div class="no-articles">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                        <path d="M7 7h10"></path>
                        <path d="M7 12h10"></path>
                        <path d="M7 17h6"></path>
                    </svg>
                    <p>هیچ مقاله‌ای یافت نشد</p>
                </div>
            `;
        }

        return this.articles.map(article => {
            // افزودن کلاس خاص برای دسته‌بندی‌های خاص (برای افکت شیشه‌ای)
            const specialClass = this.getSpecialCategoryClass(article.category);
            
            return `
                <article class="article-card ${specialClass}" data-category="${article.category}">
                    <a href="${article.link}" class="article-link">
                        <div class="article-thumbnail-container">
                            <img src="${article.image}" alt="${article.title}" class="article-thumbnail" loading="lazy">
                        </div>
                        <div class="article-content">
                            <span class="article-category-badge">${article.category}</span>
                            <h3 class="article-title">${article.title}</h3>
                            <div class="article-meta">
                                <span class="article-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    تیم فیلتربین
                                </span>
                                <span class="article-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    ${article.date}
                                </span>
                                <span class="article-meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    ${article.readingTime} دقیقه
                                </span>
                            </div>
                            <p class="article-excerpt">${article.excerpt}</p>
                        </div>
                    </a>
                </article>
            `;
        }).join('');
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
