# راهنمای استفاده از کامپوننت Article

## تغییرات انجام شده

### 1. استایل برچسب‌ها (Tags)
- برچسب‌ها حالا **بدون مربع** و فقط **متن ساده** هستند
- در هاور، رنگ متن **قرمز** می‌شود
- فاصله بین برچسب‌ها افزایش یافته

### 2. کامپوننت Article
یک کامپوننت JavaScript ایجاد شد که:
- ساختار HTML تکراری را حذف می‌کند
- همه مقالات را یکسان می‌کند
- فهرست مطالب را خودکار تولید می‌کند
- دکمه‌های اشتراک‌گذاری را مدیریت می‌کند

## نحوه استفاده

### فرمت جدید مقالات

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عنوان مقاله - فیلتربین</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="../../assets/logo/logo.svg">
    
    <!-- Fonts -->
    <link rel="stylesheet" href="../../assets/Font/fontiran.css">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/components.css">
    <link rel="stylesheet" href="../../css/article.css">
</head>
<body class="article-template">
    <!-- Header Component -->
    <div id="header-root"></div>

    <!-- Article Root -->
    <div id="article-root"></div>

    <!-- Footer Component -->
    <div id="footer-root"></div>

    <!-- Component Scripts -->
    <script src="../../js/components/header.js"></script>
    <script src="../../js/components/footer.js"></script>
    <script src="../../js/components/article.js"></script>
    <script>
        // Article Data
        const articleData = {
            id: '1',
            title: 'عنوان کامل مقاله',
            category: 'تکنولوژی',
            author: 'تیم فیلتربین',
            date: '۱۸ آبان ۱۴۰۳',
            readingTime: '25',
            excerpt: 'خلاصه کوتاه مقاله',
            tags: ['برچسب۱', 'برچسب۲', 'برچسب۳'],
            image: '/assets/images/ai.png',
            featured: true,
            lede: 'پاراگراف مقدماتی مقاله',
            content: `
                <h2>عنوان بخش اول</h2>
                <p>متن بخش اول...</p>
                
                <h3>زیرعنوان</h3>
                <p>متن زیربخش...</p>
                
                <blockquote>
                نقل قول مهم
                </blockquote>
                
                <h2>عنوان بخش دوم</h2>
                <p>متن بخش دوم...</p>
                
                <ul>
                    <li>مورد اول</li>
                    <li>مورد دوم</li>
                </ul>
            `
        };

        // Mount components
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

## مزایا

1. **یکسان‌سازی**: همه مقالات ساختار یکسانی دارند
2. **سادگی**: فقط محتوای مقاله را در `content` قرار دهید
3. **خودکار**: فهرست مطالب، دکمه‌های اشتراک و متا اطلاعات خودکار ساخته می‌شوند
4. **نگهداری آسان**: تغییرات در کامپوننت به همه مقالات اعمال می‌شود
5. **آینده‌نگر**: افزودن ویژگی‌های جدید بسیار ساده است

## نکات مهم

- همه `h2` و `h3` ها در `content` به فهرست مطالب اضافه می‌شوند
- برچسب‌ها به صورت آرایه وارد می‌شوند
- تصویر کاور در `image` مشخص می‌شود
- `lede` پاراگراف مقدماتی با استایل خاص است (اختیاری)
