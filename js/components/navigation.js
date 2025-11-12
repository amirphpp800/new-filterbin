
// Navigation Component
class NavigationComponent {
    constructor() {
        const isSubPage = window.location.pathname.includes('/pages/');
        const isArticlePage = window.location.pathname.includes('/articles/');
        this.basePath = isSubPage ? '../' : (isArticlePage ? '../../' : '');
    }

    render() {
        return `
            <nav class="nav">
                <a href="${this.basePath}index.html" class="nav-link">خانه</a>
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
                            <a href="${this.basePath}pages/iran-off.html" class="mega-menu-card mega-card-dark">
                                <div class="mega-card-icon">
                                    <svg width="50" height="50" viewBox="0 0 400 400" fill="currentColor">
                                        <path d="m 88.24563,2.74631 c -31.415785,-1.87529 -62.451576,14.69721 -77.271195,44.39662 -19.7570055,39.59915 -3.3384708,87.81468 36.56293,107.46041 l 83.178295,40.92022 c -9.80077,29.4623 -1.92461,63.25252 22.87096,85.1207 l 109.54071,96.56178 c 33.26145,29.3283 84.35775,26.3619 113.91802,-6.6523 29.56262,-33.01366 26.56716,-83.79214 -6.69431,-113.11996 l -51.75999,-45.63013 -9.34182,-8.27316 -16.648,18.61433 9.3887,8.2739 51.76005,45.63037 c 23.21401,20.46813 25.24967,54.9152 4.61663,77.95835 -20.63543,23.0441 -55.42671,25.0998 -78.63816,4.6317 L 170.18774,262.02893 C 153.79389,247.57354 148.23961,226.20625 153.49779,206.74684 l 25.05958,12.3314 c 39.9014,19.64597 88.46116,3.45716 108.22064,-36.14246 9.68727,-19.42045 10.76554,-40.97747 4.55988,-60.11761 l -3.80484,-11.82213 -23.84067,7.60893 3.85418,11.82312 c 4.28105,13.20638 3.59511,27.94306 -3.16329,41.48477 -13.77833,27.61268 -46.79303,38.64424 -74.68775,24.91031 l -24.5735,-12.12883 c 0.24675,-0.19739 0.27143,-0.42687 0.44415,-0.62428 11.51319,-12.85846 27.39133,-19.03846 43.33858,-18.59531 l 12.51006,0.31337 0.71555,-24.86269 -12.51004,-0.31338 c -23.00173,-0.64154 -46.22799,8.46786 -62.74274,26.91193 -1.70255,1.89749 -2.92149,4.03727 -4.4069,6.04603 L 58.663168,132.29916 C 30.768462,118.56525 19.625375,85.77854 33.401251,58.16586 47.179581,30.55293 80.19428,19.52187 108.08901,33.25578 l 73.19245,36.03687 11.1949,5.53552 11.1406,-22.30368 -11.24671,-5.48791 -73.18999,-36.08546 c -9.97597,-4.91124 -20.477503,-7.58006 -30.949443,-8.20531 z"></path>
                                    </svg>
                                </div>
                                <h4 class="mega-card-title">ایران در خاموشی</h4>
                            </a>
                            
                            <a href="${this.basePath}pages/bpb-guide.html" class="mega-menu-card mega-card-green">
                                <div class="mega-card-icon">
                                    <svg width="50" height="50" viewBox="0 0 32 32" fill="currentColor">
                                        <path d="M21.756,17.988c-0.017,0.077 -0.015,0.157 0.005,0.233c0.443,1.682 0.737,3.231 0.776,4.48c0.003,0.119 0.049,0.232 0.129,0.32c0.824,0.908 2.013,1.479 3.334,1.479c2.484,0 4.5,-2.016 4.5,-4.5c0,-3.662 -4.049,-12.215 -4.049,-12.215c-0.082,-0.174 -0.258,-0.285 -0.451,-0.285c-0.193,-0 -0.369,0.111 -0.451,0.285c-0,0 -2.915,6.128 -3.793,10.203Zm4.245,-8.795c-0.83,1.839 -2.576,5.899 -3.242,8.891c0.425,1.635 0.708,3.147 0.769,4.393c0.634,0.632 1.507,1.023 2.472,1.023c1.932,0 3.5,-1.568 3.5,-3.5c0,-2.792 -2.461,-8.517 -3.499,-10.807Z"></path>
                                    </svg>
                                </div>
                                <h4 class="mega-card-title">راهنمای BPB Panel</h4>
                            </a>
                        </div>
                        
                        <a href="${this.basePath}pages/internet-disruption-toolkit.html" class="mega-menu-card mega-card-full mega-card-brown">
                            <div class="mega-card-icon">
                                <svg width="50" height="50" viewBox="0 0 48 48" fill="currentColor">
                                    <path d="M19.9,27.3l-.2-1.7a15.6,15.6,0,0,0-7.4,4.9,1.9,1.9,0,0,0-.4,1.2,2,2,0,0,0,.4,1.3,2,2,0,0,0,3.1,0,11.2,11.2,0,0,1,5.3-3.5A3.5,3.5,0,0,1,19.9,27.3Z"></path>
                                </svg>
                            </div>
                            <h4 class="mega-card-title">جعبه‌ابزار اختلال در اینترنت</h4>
                        </a>
                    </div>
                </div>
                <a href="${this.basePath}pages/articles.html" class="nav-link">یادداشت‌ها</a>
                <a href="javascript:void(0);" class="nav-link" title="پادکست‌ها - به زودی">پادکست‌ها</a>
                <a href="${this.basePath}pages/about.html" class="nav-link">درباره</a>
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
    module.exports = NavigationComponent;
}
