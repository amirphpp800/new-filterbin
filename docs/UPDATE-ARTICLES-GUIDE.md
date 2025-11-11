# راهنمای بروزرسانی مقالات

## وضعیت فعلی

مقالات 1 تا 5 ساختارهای مختلفی دارند:
- برخی header و footer ندارند
- برخی sidebar ندارند  
- ساختار HTML متفاوت است

## تغییرات اعمال شده

### ✅ استایل‌های بروزرسانی شده:

1. **برچسب‌ها (Tags)**
   - رنگ سفید: `#ffffff`
   - در هاور قرمز می‌شوند
   - بدون مربع، بوردر یا زیرخط

2. **برچسب دسته‌بندی (Category Badge)**
   - پس‌زمینه قرمز شیشه‌ای
   - همیشه قرمز (ثابت)
   - افکت blur

3. **Sidebar مقالات**
   - بدون خطوط جداکننده
   - فاصله بهتر بین آیتم‌ها

## برای بروزرسانی مقالات:

### گزینه 1: استفاده از کامپوننت (پیشنهادی)

برای مقالات جدید از کامپوننت استفاده کنید:

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عنوان مقاله - فیلتربین</title>
    
    <link rel="icon" type="image/svg+xml" href="../../assets/logo/logo.svg">
    <link rel="stylesheet" href="../../assets/Font/fontiran.css">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/components.css">
    <link rel="stylesheet" href="../../css/article.css">
</head>
<body class="article-template">
    <div id="header-root"></div>
    <div id="article-root"></div>
    <div id="footer-root"></div>

    <script src="../../js/components/header.js"></script>
    <script src="../../js/components/footer.js"></script>
    <script src="../../js/components/article.js"></script>
    <script>
        const articleData = {
            id: '2',
            title: 'عنوان مقاله',
            category: 'دسته‌بندی',
            author: 'تیم فیلتربین',
            date: 'تاریخ',
            readingTime: '35',
            excerpt: 'خلاصه',
            tags: ['برچسب1', 'برچسب2'],
            image: '/assets/images/image.png',
            lede: 'پاراگراف مقدماتی',
            content: `
                <h2>عنوان</h2>
                <p>متن...</p>
            `
        };

        const headerComponent = new HeaderComponent();
        headerComponent.mount('#header-root');
        
        const articleComponent = new ArticleComponent(articleData);
        articleComponent.mount('#article-root');
        
        const footerComponent = new FooterComponent();
        footerComponent.mount('#footer-root');
    </script>
</body>
</html>
```

### گزینه 2: نگه داشتن ساختار فعلی

اگر می‌خواهید ساختار فعلی را نگه دارید:

1. **فقط استایل‌ها بروزرسانی شده‌اند**
2. برچسب‌ها خودکار سفید هستند
3. برچسب دسته‌بندی خودکار قرمز شیشه‌ای است
4. نیازی به تغییر HTML نیست

## نتیجه

- ✅ استایل‌ها برای همه مقالات یکسان است
- ✅ برچسب‌ها سفید با هاور قرمز
- ✅ برچسب دسته‌بندی قرمز شیشه‌ای
- ✅ Sidebar بدون خطوط اضافی

**توصیه:** برای مقالات جدید از کامپوننت استفاده کنید، مقالات قدیمی همان‌طور که هستند کار می‌کنند.
