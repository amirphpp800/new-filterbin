# فیلتربین - پلتفرم ابزارهای دیجیتال

## 📁 ساختار پروژه

```
new-brand/
├── assets/
│   ├── Font/              # فونت‌های فارسی
│   ├── images/            # تصاویر مقالات و بنرها
│   │   ├── head-banner/   # بنرهای هدر
│   │   └── ...
│   └── logo/              # لوگو و لوگوتایپ
│       ├── logo.svg
│       └── logotype.svg
│
├── css/
│   ├── style.css          # استایل‌های پایه و متغیرها
│   └── components.css     # استایل‌های کامپوننت‌ها
│
├── js/
│   ├── components/        # کامپوننت‌های JavaScript
│   │   ├── header.js      # هدر با منوی dropdown
│   │   ├── hero.js        # بخش Hero با sidebar
│   │   ├── articles-list.js  # لیست مقالات
│   │   └── footer.js      # فوتر
│   └── app.js             # اسکریپت اصلی
│
├── data/
│   └── articles/          # فایل‌های HTML مقالات
│       ├── article-1.html
│       ├── article-2.html
│       └── ...
│
├── pages/                 # صفحات داخلی
│   ├── articles.html      # صفحه یادداشت‌ها
│   ├── about.html         # درباره ما
│   ├── iran-off.html      # ایران در خاموشی
│   ├── bpb-guide.html     # راهنمای BPB
│   └── ...
│
└── index.html             # صفحه اصلی

```

## 🎨 کامپوننت‌ها

### 1. Header Component
- منوی اصلی با dropdown
- لوگوتایپ
- منوی همبرگری برای موبایل
- بنرهای تبلیغاتی

**استفاده:**
```html
<div id="header-root"></div>
<script src="js/components/header.js"></script>
<script>
    const header = new HeaderComponent();
    header.mount('#header-root');
</script>
```

### 2. Hero Component
- کارت مقاله اصلی (Featured)
- Sidebar با 4 مقاله پیشنهادی
- Badge و آیکون‌ها

**استفاده:**
```html
<div id="hero-root"></div>
<script src="js/components/hero.js"></script>
<script>
    const hero = new HeroComponent();
    hero.mount('#hero-root');
</script>
```

### 3. Articles List Component
- بارگذاری خودکار مقالات از `data/articles`
- Parse کردن HTML و استخراج metadata
- نمایش در قالب Grid

**استفاده:**
```html
<div id="articles-root"></div>
<script src="js/components/articles-list.js"></script>
<script>
    const articles = new ArticlesListComponent();
    articles.mount('#articles-root');
</script>
```

### 4. Footer Component
- سه ستون لینک
- شبکه‌های اجتماعی
- لوگوتایپ

**استفاده:**
```html
<div id="footer-root"></div>
<script src="js/components/footer.js"></script>
<script>
    const footer = new FooterComponent();
    footer.mount('#footer-root');
</script>
```

## 🎯 ویژگی‌های کلیدی

### طراحی
- ✅ Dark Mode
- ✅ Responsive Design
- ✅ Modern UI با Glassmorphism
- ✅ انیمیشن‌های Smooth

### عملکرد
- ✅ Component-Based Architecture
- ✅ بارگذاری دینامیک مقالات
- ✅ Mega Menu برای ابزارها
- ✅ بهینه‌سازی تصاویر با Lazy Loading

### دسترسی
- ✅ RTL Support
- ✅ Semantic HTML
- ✅ ARIA Labels

## 🚀 راه‌اندازی

### نیازمندی‌ها
- مرورگر مدرن (Chrome, Firefox, Safari, Edge)
- سرور محلی (Python, Node.js یا Live Server)

### اجرا
```bash
# با Python
python -m http.server 8000

# یا با Node.js
npx http-server -p 8000

# سپس باز کنید:
http://localhost:8000
```

## 📝 افزودن مقاله جدید

1. فایل HTML جدید در `data/articles/` ایجاد کنید
2. ساختار زیر را رعایت کنید:

```html
<article 
    data-id="unique-id"
    data-category="دسته‌بندی"
    data-date="تاریخ"
    data-excerpt="خلاصه مقاله"
    data-tags="تگ1,تگ2">
    
    <h1 class="article-body-title">عنوان مقاله</h1>
    <img src="path/to/image.png" alt="توضیح" class="article-image">
    
    <!-- محتوای مقاله -->
</article>
```

3. مقاله به صورت خودکار در لیست نمایش داده می‌شود

## 🎨 تنظیمات رنگ

رنگ‌های اصلی در `css/style.css`:

```css
:root {
    --primary-color: #E02F3A;      /* قرمز اصلی */
    --dark-bg: #020203;            /* پس‌زمینه تیره */
    --card-bg: #101011;            /* پس‌زمینه کارت */
    --text-primary: #ffffff;       /* متن اصلی */
    --text-secondary: #cccccc;     /* متن ثانویه */
}
```

## 📱 Responsive Breakpoints

- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🔧 بهینه‌سازی‌های انجام شده

- ✅ کامپوننت‌سازی کامل
- ✅ حذف کدهای تکراری
- ✅ بهبود Performance
- ✅ کاهش حجم CSS/JS
- ✅ Lazy Loading برای تصاویر
- ✅ مرتب‌سازی ساختار فایل‌ها

## 📄 لایسنس

تمامی حقوق محفوظ است - فیلتربین ۲۰۲۵
