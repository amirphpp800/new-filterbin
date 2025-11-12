
// Articles Featured Component
class ArticlesFeaturedComponent {
    constructor(options = {}) {
        this.basePath = options.basePath || '';
        this.showFeatured = options.showFeatured !== false;
    }

    async loadArticles() {
        try {
            const response = await fetch(`${this.basePath}data/articles/articles.json`);
            if (!response.ok) {
                throw new Error('Failed to load articles');
            }
            const data = await response.json();
            return data.articles || [];
        } catch (error) {
            console.error('خطا در بارگذاری مقالات:', error);
            return [];
        }
    }

    createFeaturedCard(article) {
        if (!article) return '';
        
        return `
            <section class="featured-articles-card">
                <div class="featured-articles-container">
                    <!-- Main Featured Article -->
                    <div class="main-featured">
                        <div class="featured-header">
                            <div class="pattern-overlay"></div>
                            <div class="featured-icon-wrapper">
                                <div class="icon-circle">
                                    <svg class="featured-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                                        <circle cx="12" cy="8" r="3" fill="currentColor"/>
                                        <circle cx="6" cy="16" r="2" fill="currentColor"/>
                                        <circle cx="18" cy="16" r="2" fill="currentColor"/>
                                        <line x1="12" y1="11" x2="12" y2="14" stroke="currentColor" stroke-width="2"/>
                                        <line x1="12" y1="14" x2="8" y2="16" stroke="currentColor" stroke-width="2"/>
                                        <line x1="12" y1="14" x2="16" y2="16" stroke="currentColor" stroke-width="2"/>
                                    </svg>
                                </div>
                                <div class="featured-badge">
                                    <span class="badge-text">شبکه هیدر تایپ گلن</span>
                                    <div class="badge-number">۱۴۰۴</div>
                                </div>
                                <div class="red-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="featured-content">
                            <div class="featured-meta">
                                <span class="featured-category">${article.category || 'عمومی'}</span>
                                <span class="featured-date">${article.date || ''}</span>
                            </div>
                            <h2 class="featured-title">${article.title}</h2>
                            <a href="${this.basePath}${article.link}" class="featured-link">ادامه مطلب ←</a>
                        </div>
                    </div>

                    <!-- Side Articles List -->
                    <div class="side-articles">
                        <div class="side-articles-header">
                            <h3>یادداشت‌های پیشتر...</h3>
                            <svg class="header-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                                <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2"/>
                                <line x1="9" y1="21" x2="9" y2="9" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        </div>
                        <div class="side-articles-list" id="sideArticlesList">
                            <!-- Articles will be loaded here -->
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    createSideArticles(articles) {
        if (!articles || articles.length === 0) {
            return '<p style="color: #888; text-align: center; padding: 2rem;">هیچ مقاله‌ای یافت نشد</p>';
        }

        return articles.map(article => `
            <article class="side-article-item">
                <div class="side-article-content">
                    <h4 class="side-article-title">${article.title}</h4>
                    <div class="side-article-meta">
                        <span class="side-article-date">${article.date || ''}</span>
                    </div>
                </div>
                <img src="${this.basePath}${article.thumbnail}" alt="${article.title}" class="side-article-thumbnail" loading="lazy">
            </article>
        `).join('');
    }

    async mount(selector) {
        const articles = await this.loadArticles();
        console.log(`✅ تعداد ${articles.length} مقاله از JSON بارگذاری شد`);

        const element = document.querySelector(selector);
        if (!element) {
            console.error('Element not found:', selector);
            return;
        }

        if (articles.length === 0) {
            element.innerHTML = '<p style="color: #888; text-align: center; padding: 4rem;">هیچ مقاله‌ای یافت نشد</p>';
            return;
        }

        // نمایش کارت ویژه فقط در صورت فعال بودن
        if (this.showFeatured) {
            element.innerHTML = this.createFeaturedCard(articles[0]);
            
            // بارگذاری مقالات کناری
            const sideArticlesList = document.getElementById('sideArticlesList');
            if (sideArticlesList) {
                const sideArticles = articles.slice(1, 6);
                sideArticlesList.innerHTML = this.createSideArticles(sideArticles);
            }
        } else {
            // نمایش تمام مقالات در حالت لیست
            element.innerHTML = `
                <section class="articles-list-section">
                    <div class="container">
                        <div class="articles-grid">
                            ${articles.map(article => `
                                <article class="article-card">
                                    <a href="${this.basePath}${article.link}" class="article-card-link">
                                        <img src="${this.basePath}${article.thumbnail}" alt="${article.title}" class="article-thumbnail" loading="lazy">
                                        <div class="article-content">
                                            <div class="article-meta">
                                                <span class="article-category">${article.category || 'عمومی'}</span>
                                                <span class="article-date">${article.date || ''}</span>
                                            </div>
                                            <h3 class="article-title">${article.title}</h3>
                                            <p class="article-excerpt">${article.excerpt || ''}</p>
                                        </div>
                                    </a>
                                </article>
                            `).join('')}
                        </div>
                    </div>
                </section>
            `;
        }
    }
}
