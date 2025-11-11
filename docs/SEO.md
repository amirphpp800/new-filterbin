# راهنمای SEO سایت فیلتربین

## 🎯 استراتژی SEO

### 1. **Meta Tags اصلی**

#### صفحه اصلی (index.html)
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Title -->
    <title>فیلتربین - ابزارهای دیجیتال و امنیت سایبری</title>
    
    <!-- Description -->
    <meta name="description" content="فیلتربین پلتفرم ابزارهای دیجیتال، راهنماهای امنیت سایبری و دسترسی آزاد به اینترنت. راهنمای BPB Panel، ابزارهای دور زدن فیلتر و مقالات تخصصی.">
    
    <!-- Keywords -->
    <meta name="keywords" content="فیلتربین, BPB Panel, دور زدن فیلتر, امنیت سایبری, VPN, Cloudflare Workers, اینترنت آزاد, فیلترشکن">
    
    <!-- Author -->
    <meta name="author" content="فیلتربین">
    
    <!-- Robots -->
    <meta name="robots" content="index, follow">
    
    <!-- Language -->
    <meta http-equiv="content-language" content="fa">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://filterbin.space/">
    <meta property="og:title" content="فیلتربین - ابزارهای دیجیتال و امنیت سایبری">
    <meta property="og:description" content="پلتفرم ابزارهای دیجیتال، راهنماهای امنیت سایبری و دسترسی آزاد به اینترنت">
    <meta property="og:image" content="https://filterbin.space/assets/logo/og-image.png">
    <meta property="og:locale" content="fa_IR">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://filterbin.space/">
    <meta property="twitter:title" content="فیلتربین - ابزارهای دیجیتال و امنیت سایبری">
    <meta property="twitter:description" content="پلتفرم ابزارهای دیجیتال، راهنماهای امنیت سایبری و دسترسی آزاد به اینترنت">
    <meta property="twitter:image" content="https://filterbin.space/assets/logo/twitter-image.png">
    
    <!-- Canonical -->
    <link rel="canonical" href="https://filterbin.space/">
    
    <!-- Alternate for different languages (if needed) -->
    <link rel="alternate" hreflang="fa" href="https://filterbin.space/">
    <link rel="alternate" hreflang="en" href="https://filterbin.space/en/">
</head>
```

### 2. **Structured Data (Schema.org)**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "فیلتربین",
  "url": "https://filterbin.space",
  "description": "پلتفرم ابزارهای دیجیتال و امنیت سایبری",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://filterbin.space/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "فیلتربین",
  "url": "https://filterbin.space",
  "logo": "https://filterbin.space/assets/logo/logo.svg",
  "sameAs": [
    "https://twitter.com/filterbin",
    "https://t.me/filterbin",
    "https://github.com/filterbin",
    "https://youtube.com/@filterbin"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "filterbinn@proton.me",
    "contactType": "Customer Service"
  }
}
</script>
```

### 3. **Structured Data برای مقالات**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "از اینترنت طبقاتی تا اعلام شروط رفع فیلتر تلگرام",
  "image": "https://filterbin.space/assets/images/network.png",
  "author": {
    "@type": "Organization",
    "name": "فیلتربین"
  },
  "publisher": {
    "@type": "Organization",
    "name": "فیلتربین",
    "logo": {
      "@type": "ImageObject",
      "url": "https://filterbin.space/assets/logo/logo.svg"
    }
  },
  "datePublished": "2024-11-07",
  "dateModified": "2024-11-07",
  "description": "بررسی اجرای گام به گام مصوبه‌ای که انتشار عمومی نیافت"
}
</script>
```

### 4. **Breadcrumb Schema**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "خانه",
    "item": "https://filterbin.space/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "یادداشت‌ها",
    "item": "https://filterbin.space/pages/articles.html"
  },{
    "@type": "ListItem",
    "position": 3,
    "name": "عنوان مقاله",
    "item": "https://filterbin.space/pages/article-detail.html"
  }]
}
</script>
```

## 📝 بهینه‌سازی محتوا

### 1. **عناوین (Headings)**
```html
<!-- استفاده صحیح از H1 تا H6 -->
<h1>عنوان اصلی صفحه (فقط یک H1)</h1>
<h2>عنوان بخش اصلی</h2>
<h3>زیرعنوان</h3>
```

### 2. **Alt Text برای تصاویر**
```html
<img src="assets/images/network.png" 
     alt="نمودار شبکه اینترنت ایران و فیلترینگ" 
     title="شبکه اینترنت">
```

### 3. **لینک‌های داخلی**
```html
<!-- استفاده از لینک‌های توصیفی -->
<a href="/pages/bpb-guide.html" title="راهنمای کامل BPB Panel">
    راهنمای BPB Panel
</a>
```

## 🔍 کلمات کلیدی اصلی

### کلمات کلیدی اولویت بالا:
1. فیلتربین
2. BPB Panel
3. دور زدن فیلتر
4. امنیت سایبری ایران
5. VPN رایگان
6. Cloudflare Workers
7. فیلترشکن
8. اینترنت آزاد

### کلمات کلیدی Long-tail:
1. "راهنمای نصب BPB Panel"
2. "بهترین روش دور زدن فیلتر در ایران"
3. "امنیت دیجیتال در ایران"
4. "ابزارهای دسترسی به اینترنت آزاد"

## 🗺️ Sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://filterbin.space/</loc>
    <lastmod>2024-11-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://filterbin.space/pages/articles.html</loc>
    <lastmod>2024-11-11</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://filterbin.space/pages/bpb-guide.html</loc>
    <lastmod>2024-11-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://filterbin.space/pages/iran-off.html</loc>
    <lastmod>2024-11-11</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://filterbin.space/pages/about.html</loc>
    <lastmod>2024-11-11</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

## 🤖 Robots.txt

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://filterbin.space/sitemap.xml
```

## 📊 Google Search Console

### تنظیمات پیشنهادی:
1. ثبت سایت در Google Search Console
2. ارسال Sitemap
3. بررسی Coverage Report
4. رفع خطاهای Index
5. بهینه‌سازی Core Web Vitals

## 🔗 Link Building

### استراتژی‌های پیشنهادی:
1. **محتوای با کیفیت:** تولید مقالات تخصصی و راهنماها
2. **Guest Posting:** نوشتن مقاله در سایت‌های مرتبط
3. **Social Media:** فعالیت در شبکه‌های اجتماعی
4. **GitHub:** اشتراک‌گذاری پروژه‌های Open Source
5. **Forum Participation:** مشارکت در انجمن‌های تخصصی

## 📱 Mobile SEO

```html
<!-- Viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Mobile-friendly test -->
<!-- https://search.google.com/test/mobile-friendly -->

<!-- App Links (اختیاری) -->
<meta property="al:android:url" content="filterbin://home">
<meta property="al:android:package" content="com.filterbin.app">
<meta property="al:android:app_name" content="فیلتربین">
```

## 🎯 Local SEO (در صورت نیاز)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "فیلتربین",
  "image": "https://filterbin.space/assets/logo/logo.svg",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IR"
  },
  "url": "https://filterbin.space"
}
</script>
```

## 📈 Analytics و Tracking

### Google Analytics 4
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Matomo (Privacy-friendly alternative)
```html
<!-- Matomo -->
<script>
  var _paq = window._paq = window._paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.filterbin.space/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
  })();
</script>
```

## ✅ SEO Checklist

### On-Page SEO
- [x] Title tags بهینه (<60 کاراکتر)
- [x] Meta descriptions (<160 کاراکتر)
- [x] H1 tags (یک عدد در هر صفحه)
- [x] Alt text برای تصاویر
- [x] URL های SEO-friendly
- [x] Internal linking
- [x] Mobile-responsive
- [x] Page speed optimization
- [ ] Schema markup
- [ ] Canonical tags

### Technical SEO
- [x] HTTPS
- [x] XML Sitemap
- [x] Robots.txt
- [ ] 404 page
- [ ] 301 redirects
- [ ] Structured data
- [ ] Breadcrumbs
- [ ] Pagination

### Content SEO
- [x] کیفیت محتوا
- [x] کلمات کلیدی مرتبط
- [x] محتوای منحصر به فرد
- [ ] محتوای به‌روز
- [ ] محتوای طولانی (>1000 کلمه)

## 🛠️ ابزارهای SEO

1. **Google Search Console**
2. **Google Analytics**
3. **Ahrefs** (پولی)
4. **SEMrush** (پولی)
5. **Ubersuggest**
6. **Screaming Frog**
7. **Yoast SEO** (WordPress)

## 📊 KPIs برای پیگیری

1. **Organic Traffic**
2. **Keyword Rankings**
3. **Click-Through Rate (CTR)**
4. **Bounce Rate**
5. **Average Session Duration**
6. **Pages per Session**
7. **Conversion Rate**

---

**آخرین به‌روزرسانی:** ۲۱ آبان ۱۴۰۴
**نسخه:** 1.0.0
