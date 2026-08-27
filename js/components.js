(function () {
    const currentPath = window.location.pathname;
    const isSubFolder = currentPath.includes('/pages/') || currentPath.includes('/product/');
    const root = isSubFolder ? '../' : './';

    const isHome = currentPath.endsWith('index.html') || currentPath.endsWith('/') || currentPath === '';
    const isStore = currentPath.endsWith('store.html');

    // 공통 배경 레이어 주입 (상·하단 그라데이션 포함)
    const bgContainer = document.getElementById('common-bg');
    if (bgContainer) {
        bgContainer.innerHTML = `
            <div class="fixed-bg-wrapper">
                <div class="custom-bg-img" id="customBg"></div>
                <div class="top-gradient-overlay"></div>
                <div class="bottom-gradient-overlay"></div>
            </div>
        `;
    }

    // 상단 헤더 네비게이션 주입
    const headerContainer = document.getElementById('common-header');
    if (headerContainer) {
        headerContainer.innerHTML = `
            <header class="header-nav">
                <a href="${root}index.html" class="logo-btn">TeamSelenyx</a>
                <div class="desktop-menu-wrapper">
                    <ul class="desktop-menu">
                        <li>
                            <a href="${root}index.html" class="${isHome ? 'active' : ''}">
                                <i class="fa-solid fa-house"></i>
                                <span>홈</span>
                            </a>
                        </li>
                        <li>
                            <a href="${root}store.html" class="${isStore ? 'active' : ''}">
                                <i class="fa-solid fa-store"></i>
                                <span>스토어</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://open.kakao.com/me/neroluna" target="_blank">
                                <i class="fa-solid fa-comment-dots"></i>
                                <span>문의</span>
                            </a>
                        </li>
                    </ul>
                    <a href="https://discord.gg/cy3WnPT3bm" target="_blank" class="header-btn-link">
                        <i class="fa-brands fa-discord"></i>
                        <span>Discord</span>
                    </a>
                </div>
            </header>
        `;
    }

    // 모바일 플로팅 메뉴 주입
    const mobileNavContainer = document.getElementById('common-mobile-nav');
    if (mobileNavContainer) {
        mobileNavContainer.innerHTML = `
            <nav class="mobile-floating-nav" id="mobileNav">
                <a href="${root}index.html" class="${isHome ? 'active' : ''}">
                    <i class="fa-solid fa-house"></i>
                    <span>홈</span>
                </a>
                <a href="${root}store.html" class="${isStore ? 'active' : ''}">
                    <i class="fa-solid fa-store"></i>
                    <span>스토어</span>
                </a>
                <a href="https://open.kakao.com/me/neroluna" target="_blank">
                    <i class="fa-solid fa-comment-dots"></i>
                    <span>문의</span>
                </a>
                <a href="https://discord.gg/cy3WnPT3bm" target="_blank">
                    <i class="fa-brands fa-discord"></i>
                    <span>Discord</span>
                </a>
            </nav>
        `;
    }

    // 푸터 주입
    const footerContainer = document.getElementById('common-footer');
    if (footerContainer) {
        footerContainer.innerHTML = `
            <footer class="footer-section">
                <div class="footer-brand">TeamSelenyx</div>
                <p class="footer-text">Designed by NeroLuna</p>
                <p class="footer-text"><small>2026.08.00012</small></p>
            </footer>
        `;
    }
})();