

// Articles Featured Component - Enhanced with Auto-Discovery
class ArticlesFeaturedComponent {
    constructor(options = {}) {
        this.articles = [];
        this.maxArticles = options.maxArticles || 50;
        this.useJsonConfig = options.useJsonConfig !== false;
        this.basePath = options.basePath || '';
        this.showFeatured = options.showFeatured !== false;
    }

    async loadArticles() {
        try {
            const jsonPath = `${this.basePath}data/articles/articles.json`;
            
            if (this.useJsonConfig) {
                try {
                    const jsonResponse = await fetch(jsonPath);
                    if (jsonResponse.ok) {
                        const articlesData = await jsonResponse.json();
                        await this.loadFromJSON(articlesData);
                        return;
                    }
                } catch (err) {
                    console.log('JSON config not found, using auto-discovery...');
                }
            }
            
            await this.autoDiscoverArticles();
            
        } catch (error) {
            console.error('Error loading articles:', error);
            this.articles = [];
        }
    }

    async loadFromJSON(articlesData) {
        const promises = articlesData.articles.map(articleInfo => {
            if (articleInfo.active === false) {
                return Promise.resolve(null);
            }
            const file = `${this.basePath}data/articles/${articleInfo.file}`;
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
        this.articles.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }

    async autoDiscoverArticles() {
        const articleFiles = [];
        
        for (let i = 1; i <= this.maxArticles; i++) {
            articleFiles.push(`${this.basePath}data/articles/article-${i}.html`);
        }

        const promises = articleFiles.map(file => 
            fetch(file)
                .then(res => {
                    if (!res.ok) throw new Error('File not found');
                    return res.text();
                })
                .then(html => this.parseArticleFromHTML(html, file))
                .catch(() => null)
        );

        const results = await Promise.all(promises);
        this.articles = results.filter(article => 
            article !== null && 
            article.title !== 'بدون عنوان' &&
            article.title.trim() !== '' &&
            article.id !== 'ARTICLE_ID'
        );
        
        this.articles.sort((a, b) => parseInt(b.id) - parseInt(a.id));
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
        const readingTime = article.getAttribute('data-reading-time');
        
        const titleElement = article.querySelector('.article-main-title');
        const imageElement = article.querySelector('.article-cover-image');
        
        let imageSrc = imageElement ? imageElement.getAttribute('src') : '/assets/images/default.png';
        if (imageSrc.startsWith('/')) {
            imageSrc = this.basePath.replace(/\/$/, '') + imageSrc;
        }
        
        const fileName = filePath.split('/').pop();
        const articleLink = `${this.basePath}data/articles/${fileName}`;
        
        return {
            id: id || filePath.match(/article-(\d+)/)?.[1] || '1',
            title: titleElement ? titleElement.textContent.trim() : 'بدون عنوان',
            excerpt: excerpt || 'خلاصه‌ای موجود نیست',
            image: imageSrc,
            date: date || 'تاریخ نامشخص',
            category: category || 'عمومی',
            readingTime: readingTime || '5',
            link: articleLink
        };
    }

    render() {
        if (this.articles.length === 0) {
            return `
                <section class="featured-articles-card">
                    <div class="container">
                        <div class="no-articles">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                                <path d="M7 7h10"></path>
                                <path d="M7 12h10"></path>
                                <path d="M7 17h6"></path>
                            </svg>
                            <p>در حال حاضر مقاله‌ای موجود نیست</p>
                        </div>
                    </div>
                </section>
            `;
        }

        const latestArticle = this.articles[0];
        const olderArticles = this.articles.slice(1, 5);

        return `
            <section class="featured-articles-card">
                <div class="container">
                    <div class="featured-articles-container">
                        ${this.renderSideArticles(olderArticles)}
                        ${this.renderMainFeatured(latestArticle)}
                    </div>
                </div>
            </section>
        `;
    }

    renderMainFeatured(article) {
        return `
            <a href="${article.link}" class="main-featured">
                <div class="featured-header">
                    <img src="${article.image}" alt="${article.title}">
                    <div class="featured-overlay"></div>
                    <div class="featured-badge">
                        <span class="badge-text">جدیدترین یادداشت</span>
                        <span class="badge-number">#${article.id}</span>
                    </div>
                </div>
                <div class="featured-content">
                    <div class="featured-meta">
                        <span class="featured-category">${article.category}</span>
                        <span class="featured-date">${article.date}</span>
                    </div>
                    <h2 class="featured-title">${article.title}</h2>
                    <div class="featured-link">
                        <span>مطالعه مقاله</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6"/>
                        </svg>
                    </div>
                </div>
            </a>
        `;
    }

    renderSideArticles(articles) {
        if (articles.length === 0) {
            return '';
        }

        return `
            <div class="side-articles">
                <div class="side-articles-header">
                    <h3>یادداشت‌های پیشین</h3>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                        <path d="M7 7h10"></path>
                        <path d="M7 12h10"></path>
                        <path d="M7 17h6"></path>
                    </svg>
                </div>
                <div class="side-articles-list">
                    ${articles.map(article => this.renderSideArticle(article)).join('')}
                </div>
            </div>
        `;
    }

    renderSideArticle(article) {
        return `
            <a href="${article.link}" class="side-article-item">
                <img src="${article.image}" alt="${article.title}" class="side-article-thumbnail">
                <div class="side-article-content">
                    <h4 class="side-article-title">${article.title}</h4>
                    <div class="side-article-meta">
                        <span class="side-article-date">${article.date}</span>
                    </div>
                </div>
            </a>
        `;
    }

    async mount(selector) {
        await this.loadArticles();
        const element = document.querySelector(selector);
        if (element) {
            if (this.showFeatured) {
                element.innerHTML = this.render();
            } else {
                element.innerHTML = this.renderArticlesGrid();
            }
            this.attachEvents();
        }
    }

    renderArticlesGrid() {
        if (this.articles.length === 0) {
            return `
                <section class="articles-list-section">
                    <div class="container">
                        <div class="no-articles">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                                <path d="M7 7h10"></path>
                                <path d="M7 12h10"></path>
                                <path d="M7 17h6"></path>
                            </svg>
                            <p>در حال حاضر مقاله‌ای موجود نیست</p>
                        </div>
                    </div>
                </section>
            `;
        }

        return `
            <section class="articles-list-section">
                <div class="container">
                    <div class="articles-grid">
                        ${this.articles.map(article => this.renderArticleCard(article)).join('')}
                    </div>
                </div>
            </section>
        `;
    }

    renderArticleCard(article) {
        return `
            <a href="${article.link}" class="article-card">
                <div class="article-thumbnail-container">
                    <img src="${article.image}" alt="${article.title}" class="article-thumbnail">
                </div>
                <div class="article-content">
                    <span class="article-category-badge">${article.category}</span>
                    <h3 class="article-title">${article.title}</h3>
                    <div class="article-meta">
                        <div class="article-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>${article.date}</span>
                        </div>
                        <div class="article-meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${article.readingTime} دقیقه</span>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    attachEvents() {
        const articleCards = document.querySelectorAll('.main-featured, .side-article-item');
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArticlesFeaturedComponent;
}
