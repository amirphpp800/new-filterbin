// Header Component
class HeaderComponent {
    constructor() {
        // تشخیص اینکه در کدام صفحه هستیم
        const isSubPage = window.location.pathname.includes('/pages/');
        const isArticlePage = window.location.pathname.includes('/articles/');
        this.basePath = isSubPage ? '../' : (isArticlePage ? '../../' : '');
        this.isHomePage = !isSubPage && !isArticlePage && (window.location.pathname === '/' || window.location.pathname.includes('index.html'));
        this.isArticlePage = isArticlePage;

        this.headerBanners = [
            {
                id: 1,
                image: `${this.basePath}assets/images/head-banner/H1.png`,
                link: `${this.basePath}iran-off`
            },
            {
                id: 2,
                image: `${this.basePath}assets/images/head-banner/H2.png`,
                link: `${this.basePath}bpb-guide`
            },
            {
                id: 3,
                image: `${this.basePath}assets/images/head-banner/H3.png`,
                link: `${this.basePath}bpb-guide`
            },
            {
                id: 4,
                image: `${this.basePath}assets/images/head-banner/M1.png`,
                link: `${this.basePath}source-config`
            }
        ];
    }

    render() {
        return `
            <header class="header">
                <div class="container">
                    <div class="header-top">
                        <div class="logo">
                            <a href="${this.basePath}index.html">
                                <img src="${this.basePath}assets/logo/logotype.svg" alt="فیلتربین" class="logotype">
                            </a>
                        </div>
                        <button class="hamburger-btn" aria-label="منو">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                        <nav class="nav">
                            <a href="${this.basePath}" class="nav-link">خانه</a>
                            <div class="nav-dropdown">
                                <a href="javascript:void(0);" class="nav-link dropdown-toggle">
                                    ابزارها
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </a>
                                <div class="dropdown-mega-menu">
                                    <h3 class="mega-menu-title">ابزارهای ما</h3>

                                    <a href="javascript:void(0);" class="mega-menu-card mega-card-full mega-card-tools" title="همه ابزارها - به زودی">
                                        <div class="mega-card-icon">
                                            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                            </svg>
                                        </div>
                                        <h4 class="mega-card-title">همه ابزارها</h4>
                                    </a>

                                    <h3 class="mega-menu-title mega-title-secondary">ابزارهای مهم</h3>
                                    <p class="mega-menu-subtitle">در شرایط سخت اینترنت با چه برنامه‌هایی متصل بمانیم</p>

                                    <div class="mega-menu-grid-2">
                                        <a href="${this.basePath}iran-off" class="mega-menu-card mega-card-dark">
                                            <div class="mega-card-icon">
                                                <svg width="50" height="50" viewBox="0 0 400 400" fill="currentColor">
                                                    <path d="m 88.24563,2.74631 c -31.415785,-1.87529 -62.451576,14.69721 -77.271195,44.39662 -19.7570055,39.59915 -3.3384708,87.81468 36.56293,107.46041 l 83.178295,40.92022 c -9.80077,29.4623 -1.92461,63.25252 22.87096,85.1207 l 109.54071,96.56178 c 33.26145,29.3283 84.35775,26.3619 113.91802,-6.6523 29.56262,-33.01366 26.56716,-83.79214 -6.69431,-113.11996 l -51.75999,-45.63013 -9.34182,-8.27316 -16.648,18.61433 9.3887,8.2739 51.76005,45.63037 c 23.21401,20.46813 25.24967,54.9152 4.61663,77.95835 -20.63543,23.0441 -55.42671,25.0998 -78.63816,4.6317 L 170.18774,262.02893 C 153.79389,247.57354 148.23961,226.20625 153.49779,206.74684 l 25.05958,12.3314 c 39.9014,19.64597 88.46116,3.45716 108.22064,-36.14246 9.68727,-19.42045 10.76554,-40.97747 4.55988,-60.11761 l -3.80484,-11.82213 -23.84067,7.60893 3.85418,11.82312 c 4.28105,13.20638 3.59511,27.94306 -3.16329,41.48477 -13.77833,27.61268 -46.79303,38.64424 -74.68775,24.91031 l -24.5735,-12.12883 c 0.24675,-0.19739 0.27143,-0.42687 0.44415,-0.62428 11.51319,-12.85846 27.39133,-19.03846 43.33858,-18.59531 l 12.51006,0.31337 0.71555,-24.86269 -12.51004,-0.31338 c -23.00173,-0.64154 -46.22799,8.46786 -62.74274,26.91193 -1.70255,1.89749 -2.92149,4.03727 -4.4069,6.04603 L 58.663168,132.29916 C 30.768462,118.56525 19.625375,85.77854 33.401251,58.16586 47.179581,30.55293 80.19428,19.52187 108.08901,33.25578 l 73.19245,36.03687 11.1949,5.53552 11.1406,-22.30368 -11.24671,-5.48791 -73.18999,-36.08546 c -9.97597,-4.91124 -20.477503,-7.58006 -30.949443,-8.20531 z"></path>
                                                </svg>
                                            </div>
                                            <h4 class="mega-card-title">ایران در خاموشی</h4>
                                        </a>

                                        <a href="${this.basePath}bpb-guide" class="mega-menu-card mega-card-green">
                                            <div class="mega-card-icon">
                                                <svg width="50" height="50" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.756,17.988c-0.017,0.077 -0.015,0.157 0.005,0.233c0.443,1.682 0.737,3.231 0.776,4.48c0.003,0.119 0.049,0.232 0.129,0.32c0.824,0.908 2.013,1.479 3.334,1.479c2.484,0 4.5,-2.016 4.5,-4.5c0,-3.662 -4.049,-12.215 -4.049,-12.215c-0.082,-0.174 -0.258,-0.285 -0.451,-0.285c-0.193,-0 -0.369,0.111 -0.451,0.285c-0,0 -2.915,6.128 -3.793,10.203Zm4.245,-8.795c-0.83,1.839 -2.576,5.899 -3.242,8.891c0.425,1.635 0.708,3.147 0.769,4.393c0.634,0.632 1.507,1.023 2.472,1.023c1.932,0 3.5,-1.568 3.5,-3.5c0,-2.792 -2.461,-8.517 -3.499,-10.807Z" style="fill:currentColor;"></path><path d="M9.35,23.029c0.081,-0.089 0.127,-0.203 0.13,-0.322c0.038,-1.253 0.334,-2.809 0.779,-4.498c0.02,-0.076 0.022,-0.156 0.006,-0.233c-0.881,-4.074 -3.791,-10.191 -3.791,-10.191c-0.082,-0.174 -0.258,-0.285 -0.451,-0.285c-0.193,0 -0.369,0.111 -0.451,0.285c-0,0 -4.049,8.553 -4.049,12.215c0,2.484 2.016,4.5 4.5,4.5c1.318,0 2.504,-0.568 3.327,-1.471Zm-3.328,-13.836c-1.038,2.29 -3.499,8.015 -3.499,10.807c0,1.932 1.568,3.5 3.5,3.5c0.961,0 1.833,-0.389 2.466,-1.017c0.06,-1.251 0.345,-2.769 0.773,-4.41c-0.669,-2.991 -2.411,-7.043 -3.24,-8.88Z" style="fill:currentColor;"></path><path d="M16.504,1.937c0.033,-0.242 -0.115,-0.472 -0.349,-0.544c-0.233,-0.072 -0.484,0.036 -0.594,0.254c-2.497,4.996 -7.085,14.927 -7.085,21.321c0,4.157 3.375,7.532 7.533,7.532c4.157,-0 7.532,-3.375 7.532,-7.532c-0,-3.234 -2.022,-6.74 -3.945,-10.375c-1.832,-3.461 -3.573,-7.046 -3.092,-10.656Zm-1.037,2.174c-2.507,5.222 -5.991,13.366 -5.991,18.857c0,3.605 2.927,6.532 6.533,6.532c3.605,-0 6.532,-2.927 6.532,-6.532c-0,-3.095 -1.989,-6.429 -3.829,-9.907c-1.541,-2.913 -2.983,-5.92 -3.245,-8.95Z" style="fill:currentColor;"></path><path d="M20.644,22.929c-0,-0 -0.609,4.318 -4.675,4.572c-0.276,0.017 -0.485,0.255 -0.468,0.53c0.017,0.276 0.255,0.485 0.53,0.468c4.851,-0.302 5.603,-5.428 5.603,-5.428c0.039,-0.273 -0.151,-0.527 -0.424,-0.566c-0.273,-0.039 -0.527,0.151 -0.566,0.424Z" style="fill:currentColor;"></path><path d="M2.923,19.765c-0,-0 0.4,2.684 2.945,2.842c0.276,0.018 0.513,-0.192 0.53,-0.467c0.018,-0.276 -0.192,-0.513 -0.467,-0.531c-1.762,-0.109 -2.019,-1.987 -2.019,-1.987c-0.039,-0.273 -0.293,-0.463 -0.566,-0.423c-0.273,0.039 -0.463,0.293 -0.423,0.566Z" style="fill:currentColor;"></path><path d="M22.884,19.765c0,-0 0.4,2.684 2.946,2.842c0.275,0.018 0.513,-0.192 0.53,-0.467c0.017,-0.276 -0.193,-0.513 -0.468,-0.531c-1.761,-0.109 -2.018,-1.987 -2.018,-1.987c-0.04,-0.273 -0.293,-0.463 -0.566,-0.423c-0.274,0.039 -0.463,0.293 -0.424,0.566Z" style="fill:currentColor;"></path><path d="M12.528,12.836c-0,0 -2.055,5.972 -2.028,8.17c0.003,0.276 0.23,0.497 0.506,0.494c0.276,-0.003 0.497,-0.23 0.494,-0.506c-0.026,-2.109 1.972,-7.83 1.972,-7.83c0.091,-0.261 -0.048,-0.546 -0.308,-0.636c-0.261,-0.091 -0.546,0.048 -0.636,0.308Z" style="fill:currentColor;"></path></g></svg>
                                            </div>
                                            <h4 class="mega-card-title">راهنمای BPB Panel</h4>
                                        </a>
                                    </div>

                                    <a href="${this.basePath}internet-toolkit" class="mega-menu-card mega-card-full mega-card-brown">
                                        <div class="mega-card-icon">
                                            <svg width="50" height="50" viewBox="0 0 48 48" fill="currentColor">
                                                <path d="M19.9,27.3l-.2-1.7a15.6,15.6,0,0,0-7.4,4.9,1.9,1.9,0,0,0-.4,1.2,2,2,0,0,0,.4,1.3,2,2,0,0,0,3.1,0,11.2,11.2,0,0,1,5.3-3.5A3.5,3.5,0,0,1,19.9,27.3Z"></path>
                                                <path d="M28.3,25.6l-.2,1.7a3.5,3.5,0,0,1-.8,2.2A11.2,11.2,0,0,1,32.6,33a2,2,0,0,0,3.1,0,2.1,2.1,0,0,0,0-2.5A15.6,15.6,0,0,0,28.3,25.6Z"></path>
                                                <path d="M19.1,17.5A23,23,0,0,0,7.5,23.9a2,2,0,0,0-.6,1.4,2.8,2.8,0,0,0,.4,1.2,1.9,1.9,0,0,0,3,.2,18.8,18.8,0,0,1,9.1-5.1Z"></path>
                                                <path d="M28.9,17.5l-.3,4.1a18.8,18.8,0,0,1,9.1,5.1,1.9,1.9,0,0,0,3-.2,2,2,0,0,0-.2-2.6A23,23,0,0,0,28.9,17.5Z"></path>
                                                <path d="M18.5,9.5A32,32,0,0,0,2.6,17.4a2.1,2.1,0,0,0-.2,2.7h0a2,2,0,0,0,3,.2,27.7,27.7,0,0,1,13.4-6.8Z"></path>
                                                <path d="M45.4,17.4A32,32,0,0,0,29.5,9.5l-.3,4a27.7,27.7,0,0,1,13.4,6.8,2,2,0,0,0,3-.2h0A2.1,2.1,0,0,0,45.4,17.4Z"></path>
                                                <circle cx="24" cy="38" r="5"></circle>
                                                <path d="M23.9,29h.2a1.9,1.9,0,0,0,2-1.9L27.7,7a3.7,3.7,0,1,0-7.4,0l1.6,20.1A1.9,1.9,0,0,0,23.9,29Z"></path>
                                            </svg>
                                        </div>
                                        <h4 class="mega-card-title">جعبه‌ابزار اختلال در اینترنت</h4>
                                    </a>
                                </div>
                            </div>
                            <a href="${this.basePath}articles" class="nav-link">یادداشت‌ها</a>
                            <a href="javascript:void(0);" class="nav-link" title="پادکست‌ها - به زودی">پادکست‌ها</a>
                            <a href="${this.basePath}about" class="nav-link">درباره</a>
                        </nav>
                    </div>

                    <!-- Hamburger Menu Overlay -->
                    <div class="hamburger-overlay">
                        <div class="hamburger-menu">
                            <!-- Header with Logo and Close -->
                            <div class="hamburger-top">
                                <div class="hamburger-logo">
                                    <img src="${this.basePath}assets/logo/logotype.svg" alt="فیلتربین">
                                </div>
                                <button class="hamburger-close">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>

                            <!-- Search Box -->
                            <div class="hamburger-search">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input type="text" placeholder="جستجوی تحقیقی">
                            </div>

                            <!-- Main Navigation Grid -->
                            <div class="hamburger-main-grid">
                                <a href="${this.basePath}" class="hamburger-card">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    <span>خانه</span>
                                </a>

                                <a href="${this.basePath}articles" class="hamburger-card">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                    <span>یادداشت‌ها</span>
                                </a>

                                <a href="javascript:void(0);" class="hamburger-card" title="پادکست‌ها - به زودی">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                        <line x1="12" y1="19" x2="12" y2="23"></line>
                                        <line x1="8" y1="23" x2="16" y2="23"></line>
                                    </svg>
                                    <span>پادکست‌ها</span>
                                </a>

                                <a href="${this.basePath}about" class="hamburger-card">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="16" x2="12" y2="12"></line>
                                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                    </svg>
                                    <span>درباره</span>
                                </a>
                            </div>

                            <!-- Tools Section -->
                            <h3 class="hamburger-section-title">دیده‌بانی</h3>
                            <div class="hamburger-tools">
                                <a href="javascript:void(0);" class="tool-card" title="همه ابزارها - به زودی">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                                    </svg>
                                    <span>همه ابزارها</span>
                                </a>

                                <a href="${this.basePath}iran-off" class="tool-card tool-dark">
                                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                    </svg>
                                    <span>ایران در خاموشی</span>
                                </a>

                                <a href="${this.basePath}bpb-guide" class="tool-card tool-green">
                                    <svg width="36" height="36" viewBox="0 0 32 32" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21.756,17.988c-0.017,0.077 -0.015,0.157 0.005,0.233c0.443,1.682 0.737,3.231 0.776,4.48c0.003,0.119 0.049,0.232 0.129,0.32c0.824,0.908 2.013,1.479 3.334,1.479c2.484,0 4.5,-2.016 4.5,-4.5c0,-3.662 -4.049,-12.215 -4.049,-12.215c-0.082,-0.174 -0.258,-0.285 -0.451,-0.285c-0.193,-0 -0.369,0.111 -0.451,0.285c-0,0 -2.915,6.128 -3.793,10.203Zm4.245,-8.795c-0.83,1.839 -2.576,5.899 -3.242,8.891c0.425,1.635 0.708,3.147 0.769,4.393c0.634,0.632 1.507,1.023 2.472,1.023c1.932,0 3.5,-1.568 3.5,-3.5c0,-2.792 -2.461,-8.517 -3.499,-10.807Z" style="fill:currentColor;"></path><path d="M9.35,23.029c0.081,-0.089 0.127,-0.203 0.13,-0.322c0.038,-1.253 0.334,-2.809 0.779,-4.498c0.02,-0.076 0.022,-0.156 0.006,-0.233c-0.881,-4.074 -3.791,-10.191 -3.791,-10.191c-0.082,-0.174 -0.258,-0.285 -0.451,-0.285c-0.193,0 -0.369,0.111 -0.451,0.285c-0,0 -4.049,8.553 -4.049,12.215c0,2.484 2.016,4.5 4.5,4.5c1.318,0 2.504,-0.568 3.327,-1.471Zm-3.328,-13.836c-1.038,2.29 -3.499,8.015 -3.499,10.807c0,1.932 1.568,3.5 3.5,3.5c0.961,0 1.833,-0.389 2.466,-1.017c0.06,-1.251 0.345,-2.769 0.773,-4.41c-0.669,-2.991 -2.411,-7.043 -3.24,-8.88Z" style="fill:currentColor;"></path><path d="M16.504,1.937c0.033,-0.242 -0.115,-0.472 -0.349,-0.544c-0.233,-0.072 -0.484,0.036 -0.594,0.254c-2.497,4.996 -7.085,14.927 -7.085,21.321c0,4.157 3.375,7.532 7.533,7.532c4.157,-0 7.532,-3.375 7.532,-7.532c-0,-3.234 -2.022,-6.74 -3.945,-10.375c-1.832,-3.461 -3.573,-7.046 -3.092,-10.656Zm-1.037,2.174c-2.507,5.222 -5.991,13.366 -5.991,18.857c0,3.605 2.927,6.532 6.533,6.532c3.605,-0 6.532,-2.927 6.532,-6.532c-0,-3.095 -1.989,-6.429 -3.829,-9.907c-1.541,-2.913 -2.983,-5.92 -3.245,-8.95Z" style="fill:currentColor;"></path><path d="M20.644,22.929c-0,-0 -0.609,4.318 -4.675,4.572c-0.276,0.017 -0.485,0.255 -0.468,0.53c0.017,0.276 0.255,0.485 0.53,0.468c4.851,-0.302 5.603,-5.428 5.603,-5.428c0.039,-0.273 -0.151,-0.527 -0.424,-0.566c-0.273,-0.039 -0.527,0.151 -0.566,0.424Z" style="fill:currentColor;"></path><path d="M2.923,19.765c-0,-0 0.4,2.684 2.945,2.842c0.276,0.018 0.513,-0.192 0.53,-0.467c0.018,-0.276 -0.192,-0.513 -0.467,-0.531c-1.762,-0.109 -2.019,-1.987 -2.019,-1.987c-0.039,-0.273 -0.293,-0.463 -0.566,-0.423c-0.273,0.039 -0.463,0.293 -0.423,0.566Z" style="fill:currentColor;"></path><path d="M22.884,19.765c0,-0 0.4,2.684 2.946,2.842c0.275,0.018 0.513,-0.192 0.53,-0.467c0.017,-0.276 -0.193,-0.513 -0.468,-0.531c-1.761,-0.109 -2.018,-1.987 -2.018,-1.987c-0.04,-0.273 -0.293,-0.463 -0.566,-0.423c-0.274,0.039 -0.463,0.293 -0.424,0.566Z" style="fill:currentColor;"></path><path d="M12.528,12.836c-0,0 -2.055,5.972 -2.028,8.17c0.003,0.276 0.23,0.497 0.506,0.494c0.276,-0.003 0.497,-0.23 0.494,-0.506c-0.026,-2.109 1.972,-7.83 1.972,-7.83c0.091,-0.261 -0.048,-0.546 -0.308,-0.636c-0.261,-0.091 -0.546,0.048 -0.636,0.308Z" style="fill:currentColor;"></path></g></svg>
                                    <span>راهنمای BPB Panel</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    ${this.isHomePage ? `
                    <div class="header-banners">
                        ${this.renderBanners()}
                    </div>
                    ` : ''}
                </div>
            </header>
        `;
    }

    renderBanners() {
        return this.headerBanners.map(banner => `
            <a href="${banner.link}" class="header-banner-card" data-id="${banner.id}">
                <img src="${banner.image}" alt="بنر ${banner.id}" loading="lazy">
            </a>
        `).join('');
    }

    initMobileStickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        const handleScroll = () => {
            if (window.innerWidth <= 768) { // Check if it's a mobile device
                if (window.scrollY > 50) { // Adjust scroll threshold as needed
                    header.classList.add('sticky');
                } else {
                    header.classList.remove('sticky');
                }
            } else {
                header.classList.remove('sticky'); // Ensure it's not sticky on larger screens
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check in case the page loads scrolled
        handleScroll();

        // Clean up the event listener when the component is unmounted (if applicable)
        // For this example, we assume it's mounted once and won't be unmounted.
        // If this were a more complex framework, you'd add a cleanup function.
    }


    attachEvents() {
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        const overlay = document.querySelector('.hamburger-overlay');
        const closeBtn = document.querySelector('.hamburger-close');

        const closeMenu = () => {
            if (hamburgerBtn && overlay) {
                hamburgerBtn.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        if (hamburgerBtn && overlay) {
            hamburgerBtn.addEventListener('click', () => {
                hamburgerBtn.classList.toggle('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    closeMenu();
                }
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    closeMenu();
                });
            }

            // بستن خودکار منو هنگام بزرگ شدن صفحه
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768 && overlay.classList.contains('active')) {
                    closeMenu();
                }
            });
        }

        // Initialize mobile sticky header
        this.initMobileStickyHeader();

        // Dropdown menu is now controlled by CSS :hover
        // No JavaScript needed for dropdown functionality
    }

    mount(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = this.render();
            this.attachEvents();
        }
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeaderComponent;
}