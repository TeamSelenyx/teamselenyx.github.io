/* --- [1. 배경 스크롤 블러 (최대 8px)] --- */
function handleScrollBackgroundBlur() {
    const bgImg = document.getElementById('customBg');
    if (!bgImg) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const maxBlur = 8;
    const blurAmount = Math.min(scrollY / 40, maxBlur);

    bgImg.style.filter = `blur(${blurAmount}px)`;
}

window.addEventListener('scroll', handleScrollBackgroundBlur, { passive: true });

/* --- [2. URL 파라미터 기반 상품 데이터 로드 및 오류 화면 처리] --- */
async function loadProductContent() {
    const container = document.getElementById('productContainer');
    if (!container) return;

    // URL에서 ?id=... 값 추출
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        renderErrorView('요청하신 상품을 찾을 수 없습니다.', '잘못된 접근이거나 상품 ID가 지정되지 않았습니다.');
        return;
    }

    try {
        const response = await fetch(`product/${productId}.html`);
        if (!response.ok) {
            throw new Error('상품 데이터를 찾을 수 없습니다.');
        }

        const htmlData = await response.text();
        container.innerHTML = htmlData;

        // 주입된 HTML의 제목으로 브라우저 탭 타이틀 변경
        const loadedTitle = container.querySelector('.detail-title');
        if (loadedTitle) {
            document.title = `TeamSelenyx - ${loadedTitle.textContent.trim()}`;
        }

        // 슬라이더 초기화
        initDetailSlider();

    } catch (error) {
        renderErrorView('존재하지 않는 상품입니다.', '해당 상품의 정보가 삭제되었거나 준비 중입니다.');
    }
}

/* 오류 안내 화면 렌더링 */
function renderErrorView(title, message) {
    const container = document.getElementById('productContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="detail-card" style="text-align: center; padding: 60px 24px; display: flex; flex-direction: column; align-items: center; gap: 14px;">
            <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #ff453a;"></i>
            <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--text-main);">${title}</h2>
            <p style="color: var(--text-sub); font-size: 0.95rem; line-height: 1.6; max-width: 420px; word-break: keep-all;">${message}</p>
            <div style="margin-top: 10px;">
                <a href="store.html" class="hero-btn-link" style="display: inline-flex; align-items: center; gap: 8px;">
                    <i class="fa-solid fa-arrow-left"></i>
                    <span>스토어로 돌아가기</span>
                </a>
            </div>
        </div>
    `;
}

/* --- [3. 슬라이더 로직 (1장일 때 자동 숨김)] --- */
let detailSlideIdx = 0;

function initDetailSlider() {
    const slider = document.getElementById('detailSlider');
    if (!slider) return;

    detailSlideIdx = 0;
    const slides = slider.querySelectorAll('.slide-img');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    const dotsContainer = document.getElementById('detailDots');

    if (slides.length <= 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (dotsContainer) dotsContainer.style.display = 'none';
    } else {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (dotsContainer) dotsContainer.style.display = 'flex';
    }

    updateSlideView();
}

function updateSlideView() {
    const slider = document.getElementById('detailSlider');
    const dotsContainer = document.getElementById('detailDots');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide-img');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot-item') : [];
    if (slides.length === 0) return;

    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    if (slides[detailSlideIdx]) slides[detailSlideIdx].classList.add('active');
    if (dots[detailSlideIdx]) dots[detailSlideIdx].classList.add('active');
}

function moveDetailSlide(direction) {
    const slider = document.getElementById('detailSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide-img');
    if (slides.length <= 1) return;

    detailSlideIdx += direction;
    if (detailSlideIdx >= slides.length) detailSlideIdx = 0;
    if (detailSlideIdx < 0) detailSlideIdx = slides.length - 1;

    updateSlideView();
}

function goToDetailSlide(index) {
    const slider = document.getElementById('detailSlider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide-img');
    if (index >= 0 && index < slides.length) {
        detailSlideIdx = index;
        updateSlideView();
    }
}

/* --- [4. 원본 이미지 확대 모달] --- */
function openImageModal(imgSrc) {
    if (!imgSrc) return;
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImgTarget');
    if (!modal || !modalImg) return;

    modalImg.src = imgSrc;
    modal.classList.add('active');
    document.body.classList.add('scroll-lock');
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.classList.remove('scroll-lock');
    }
}

/* --- [5. DOM 초기화] --- */
document.addEventListener('DOMContentLoaded', () => {
    handleScrollBackgroundBlur();
    loadProductContent();

    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target !== document.getElementById('modalImgTarget')) {
                closeImageModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeImageModal();
    });
});