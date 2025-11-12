// Footer Component
class FooterComponent {
    constructor() {
        // تشخیص اینکه در کدام صفحه هستیم
        const isSubPage = window.location.pathname.includes('/pages/');
        this.basePath = isSubPage ? '../' : '';
        
        this.footerData = {
            filterbin: {
                links: [
                    { title: 'درباره ما', url: `${this.basePath}pages/about.html` },
                    { title: 'پادکست لایه هفتم', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'ایران در خاموشی', url: `${this.basePath}pages/iran-off.html` }
                ]
            },
            reports: {
                links: [
                    { title: 'گزارش‌های تحقیقی', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'تهدیدات سایبری', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'شبکه و ساماندهی', url: 'javascript:void(0);', tooltip: 'به زودی' }
                ]
            },
            wiki: {
                links: [
                    { title: 'سازمان تنظیم مقررات و ارتباطات رادیویی', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'سازمان نظام صنفی رایانه‌ای', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'شورای عالی فضای مجازی', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'صدا و سیما', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'مجلس شورای اسلامی', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'مرکز پژوهش‌های مجلس', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'وزارت ارشاد و فرهنگ اسلامی', url: 'javascript:void(0);', tooltip: 'به زودی' },
                    { title: 'وزارت صنعت، معدن و تجارت', url: 'javascript:void(0);', tooltip: 'به زودی' }
                ]
            },
            contact: {
                email: 'filterbinn@proton.me',
                social: [
                    { name: 'X', url: 'javascript:void(0);', icon: 'x', tooltip: 'به زودی' },
                    { name: 'Telegram', url: 'https://t.me/Filterbin', icon: 'telegram' },
                    { name: 'GitHub', url: 'https://github.com/filterbin', icon: 'github' },
                    { name: 'YouTube', url: 'javascript:void(0);', icon: 'youtube', tooltip: 'به زودی' }
                ]
            },
            english: {
                text: 'Access the English version',
                link: 'filter.watch/english',
                url: 'javascript:void(0);'
            }
        };
    }

    render() {
        return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-content">
                        <!-- Column 1: Filterbin & Reports (Right) -->
                        <div class="footer-section">
                            <h4 class="footer-title">فیلتربین</h4>
                            <ul class="footer-links">
                                ${this.footerData.filterbin.links.map(link => `
                                    <li><a href="${link.url}"${link.tooltip ? ` title="${link.tooltip}"` : ''}>${link.title}</a></li>
                                `).join('')}
                            </ul>
                            <h4 class="footer-title footer-subtitle">گزارش‌های تحقیقی</h4>
                            <ul class="footer-links">
                                ${this.footerData.reports.links.map(link => `
                                    <li><a href="${link.url}"${link.tooltip ? ` title="${link.tooltip}"` : ''}>${link.title}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <!-- Column 2: Wiki (Center) -->
                        <div class="footer-section">
                            <h4 class="footer-title">ویکی</h4>
                            <ul class="footer-links">
                                ${this.footerData.wiki.links.map(link => `
                                    <li><a href="${link.url}"${link.tooltip ? ` title="${link.tooltip}"` : ''}>${link.title}</a></li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <!-- Column 3: Social & Contact (Left) -->
                        <div class="footer-section footer-social-section">
                            <h4 class="footer-title">ارتباط با ما</h4>
                            <div class="footer-email">
                                <a href="mailto:${this.footerData.contact.email}">${this.footerData.contact.email}</a>
                            </div>
                            <h4 class="footer-title footer-subtitle">شبکه‌های اجتماعی</h4>
                            <div class="social-links">
                                ${this.footerData.contact.social.map(social => `
                                    <a href="${social.url}" class="social-link" aria-label="${social.name}"${social.tooltip ? ` title="${social.tooltip}"` : ''}>
                                        ${this.getSocialIcon(social.icon)}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <div class="footer-logo">
                            <img src="${this.basePath}assets/logo/logotype.svg" alt="فیلتربین" class="footer-logotype">
                        </div>
                        <span class="footer-year">۲۰۲۵</span>
                    </div>
                </div>
            </footer>
        `;
    }

    getSocialIcon(type) {
        const icons = {
            x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
            telegram: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>',
            github: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>',
            youtube: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
        };
        return icons[type] || '';
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
    module.exports = FooterComponent;
}
