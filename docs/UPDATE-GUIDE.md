# راهنمای به‌روزرسانی مقالات به استایل جدید

## 📋 تغییرات اعمال شده

### 1. **فایل CSS جدید**
فایل `css/article.css` ساخته شد با:
- ✅ طراحی مدرن و تمیز
- ✅ Dark theme زیبا
- ✅ Sidebar sticky
- ✅ TOC (Table of Contents) خودکار
- ✅ دکمه‌های share فعال
- ✅ Responsive کامل

### 2. **Template جدید**
فایل `article-template.html` به‌روز شد با:
- ✅ ساختار بهبود یافته
- ✅ TOC خودکار
- ✅ Share buttons عملیاتی
- ✅ مقالات مرتبط
- ✅ Scripts برای interactivity

## 🔄 نحوه به‌روزرسانی مقالات موجود

### گام 1: به‌روزرسانی لینک‌های CSS

**قدیم:**
```html
<link rel="stylesheet" href="/css/main.css">
<link rel="stylesheet" href="/css/article.css">
<link rel="stylesheet" href="/css/article-template.css">
```

**جدید:**
```html
<link rel="icon" type="image/svg+xml" href="../../assets/logo/logo.svg">
<link rel="stylesheet" href="../../assets/Font/fontiran.css">
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../../css/components.css">
<link rel="stylesheet" href="../../css/article.css">
```

### گام 2: اضافه کردن بخش TOC

بعد از بخش "Share Section" و قبل از "Related Articles":

```html
<!-- Divider -->
<div class="sidebar-divider"></div>

<!-- Table of Contents Section -->
<div class="toc-section">
    <h4>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        فهرست مطالب
    </h4>
    <ul class="toc-list" id="tocList">
        <!-- TOC will be generated automatically -->
    </ul>
</div>

<!-- Divider -->
<div class="sidebar-divider"></div>
```

### گام 3: اضافه کردن ID به عناوین H2

هر H2 که می‌خواهید در TOC نمایش داده شود باید ID داشته باشد:

```html
<h2 id="section-1">عنوان بخش اول</h2>
<h2 id="section-2">عنوان بخش دوم</h2>
<h2 id="conclusion">نتیجه‌گیری</h2>
```

### گام 4: اضافه کردن Scripts

قبل از `</body>`:

```html
<!-- Scripts -->
<script>
    // Generate Table of Contents automatically
    document.addEventListener('DOMContentLoaded', function() {
        const tocList = document.getElementById('tocList');
        const articleContent = document.querySelector('.article-body-content');
        const headings = articleContent.querySelectorAll('h2[id]');
        
        headings.forEach((heading, index) => {
            const li = document.createElement('li');
            li.className = 'toc-item';
            
            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.className = 'toc-link';
            link.innerHTML = `
                <span class="toc-number">${index + 1}</span>
                <span class="toc-text">${heading.textContent}</span>
            `;
            
            li.appendChild(link);
            tocList.appendChild(li);
        });
        
        // Smooth scroll for TOC links
        document.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    
                    // Update active state
                    document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
        
        // Active TOC item on scroll
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY + 150;
            let currentSection = '';
            
            headings.forEach(heading => {
                const sectionTop = heading.offsetTop;
                if (scrollPosition >= sectionTop) {
                    currentSection = heading.id;
                }
            });
            
            document.querySelectorAll('.toc-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Share buttons functionality
        const shareButtons = {
            linkedin: function() {
                const url = encodeURIComponent(window.location.href);
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
            },
            whatsapp: function() {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(document.title);
                window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
            },
            telegram: function() {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(document.title);
                window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
            },
            twitter: function() {
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent(document.title);
                window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
            },
            copy: function() {
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const btn = document.querySelector('.share-btn.copy');
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<span style="font-size: 12px;">✓</span>';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                    }, 2000);
                });
            }
        };
        
        // Attach event listeners to share buttons
        document.querySelector('.share-btn.linkedin')?.addEventListener('click', shareButtons.linkedin);
        document.querySelector('.share-btn.whatsapp')?.addEventListener('click', shareButtons.whatsapp);
        document.querySelector('.share-btn.telegram')?.addEventListener('click', shareButtons.telegram);
        document.querySelector('.share-btn.twitter')?.addEventListener('click', shareButtons.twitter);
        document.querySelector('.share-btn.copy')?.addEventListener('click', shareButtons.copy);
    });
</script>
```

## ✨ ویژگی‌های جدید

### 1. **TOC خودکار**
- تمام H2 های با ID به صورت خودکار در TOC اضافه می‌شوند
- با کلیک smooth scroll به بخش مورد نظر
- Highlight بخش فعلی هنگام scroll

### 2. **Share Buttons فعال**
- LinkedIn: اشتراک‌گذاری مستقیم
- WhatsApp: ارسال در واتساپ
- Telegram: اشتراک در تلگرام
- Twitter/X: توییت کردن
- Copy: کپی لینک با تیک موفقیت

### 3. **Responsive Design**
- ✅ Desktop: Sidebar sticky در سمت راست
- ✅ Tablet: Sidebar در پایین صفحه
- ✅ Mobile: Layout تک ستونه

## 📝 چک‌لیست به‌روزرسانی

برای هر مقاله:
- [ ] به‌روزرسانی لینک‌های CSS
- [ ] اضافه کردن بخش TOC به sidebar
- [ ] اضافه کردن ID به تمام H2 ها
- [ ] اضافه کردن Scripts قبل از `</body>`
- [ ] تست TOC و Share buttons
- [ ] تست Responsive بودن

## 🎨 استایل‌های موجود

### رنگ‌ها:
- پس‌زمینه: `#000000`
- کارت: `rgba(20, 20, 20, 0.8)`
- متن: `#ffffff`
- متن ثانویه: `rgba(255, 255, 255, 0.7)`
- Accent: `#22c55e` (سبز)

### فونت‌ها:
- عنوان اصلی: `2.5rem` / `800`
- H2: `1.8rem` / `700`
- H3: `1.4rem` / `600`
- متن: `1.05rem` / `400`

## 🚀 مثال کامل

مقاله نمونه در `article-template.html` موجود است که می‌توانید از آن استفاده کنید.

## ❓ سوالات متداول

**س: آیا باید همه مقالات را دستی به‌روز کنم؟**
ج: بله، اما فرآیند ساده است. فقط CSS ها را تغییر دهید، TOC اضافه کنید و scripts را کپی کنید.

**س: اگر نخواهم TOC داشته باشم چطور؟**
ج: کافی است بخش TOC را حذف کنید. Scripts همچنان کار می‌کنند.

**س: آیا می‌توانم share buttons را سفارشی کنم؟**
ج: بله، در بخش Scripts می‌توانید URLها و رفتارها را تغییر دهید.

---

**آخرین به‌روزرسانی:** ۲۰ آبان ۱۴۰۳
**نسخه:** 2.0
