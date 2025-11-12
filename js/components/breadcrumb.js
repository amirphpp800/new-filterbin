
// Breadcrumb Component
class BreadcrumbComponent {
    constructor(items) {
        this.items = items || this.generateFromPath();
    }

    generateFromPath() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(s => s);
        const items = [{ text: 'خانه', url: '/' }];
        
        let currentPath = '';
        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const cleanSegment = segment.replace('.html', '');
            const text = this.getSegmentText(cleanSegment);
            
            if (index === segments.length - 1) {
                items.push({ text, url: null });
            } else {
                items.push({ text, url: currentPath });
            }
        });
        
        return items;
    }

    getSegmentText(segment) {
        const map = {
            'pages': 'صفحات',
            'articles': 'یادداشت‌ها',
            'about': 'درباره',
            'bpb-guide': 'راهنمای BPB',
            'iran-off': 'ایران در خاموشی',
            'internet-disruption-toolkit': 'جعبه‌ابزار اختلال',
            'messaging-toolkit': 'ابزار پیام‌رسانی'
        };
        return map[segment] || segment;
    }

    render() {
        if (this.items.length <= 1) return '';
        
        const breadcrumbItems = this.items.map((item, index) => {
            if (item.url) {
                return `<a href="${item.url}" class="breadcrumb-link">${item.text}</a>`;
            }
            return `<span class="breadcrumb-current">${item.text}</span>`;
        }).join('<span class="breadcrumb-separator">/</span>');

        return `
            <nav class="breadcrumb" aria-label="Breadcrumb">
                <ol class="breadcrumb-list">
                    ${breadcrumbItems}
                </ol>
            </nav>
        `;
    }

    mount(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = this.render();
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BreadcrumbComponent;
}
