/* --- [1. 스크롤 시 배경 이미지 동적 블러 (강도 완화: 최대 8px)] --- */
function handleScrollBackgroundBlur() {
    const bgImg = document.getElementById('customBg');
    if (!bgImg) return;

    // 스크롤 위치에 비례하여 0px ~ 최대 8px까지 은은하게 블러 처리
    const scrollY = window.scrollY || window.pageYOffset;
    const maxBlur = 8;
    const blurAmount = Math.min(scrollY / 40, maxBlur);

    bgImg.style.filter = `blur(${blurAmount}px)`;
}

// 스크롤 이벤트 리스너 등록
window.addEventListener('scroll', handleScrollBackgroundBlur, { passive: true });


/* --- [2. HTML 템플릿 기반 소식 모달 열기 함수] --- */
function openNewsModalById(templateId) {
    const template = document.getElementById(templateId);
    const modalOverlay = document.getElementById('productModal');
    if (!template || !modalOverlay) return;

    // HTML에 작성된 템플릿 내용을 모달로 복사
    modalOverlay.innerHTML = template.innerHTML;
    modalOverlay.classList.add('active');
    document.body.classList.add('scroll-lock');
}

/* --- [3. 소식 모달 닫기 함수] --- */
function closeNewsModal() {
    const modalOverlay = document.getElementById('productModal');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('scroll-lock');
    }
}

/* --- [4. 초기화 및 이벤트 리스너 등록] --- */
document.addEventListener('DOMContentLoaded', () => {
    // 페이지 로드 시 현재 스크롤 위치에 맞춰 배경 블러 1회 적용
    handleScrollBackgroundBlur();

    // 모달 바깥 영역 클릭 시 닫기
    const modalOverlay = document.getElementById('productModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeNewsModal();
            }
        });
    }

    // ESC 키 입력 시 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNewsModal();
        }
    });

    // 메인 펀딩 게이지바 초기화
    initFundingGauge();
});


/* --- [5. 메인 화면 펀딩 슬라이더 제어] --- */
let fundingSlideIdx = 0;

function moveFundingSlide(direction) {
    const slider = document.getElementById('mainFundingSlider');
    const dotsContainer = document.getElementById('mainFundingDots');
    if (!slider || !dotsContainer) return;

    const slides = slider.querySelectorAll('.slide-img');
    const dots = dotsContainer.querySelectorAll('.dot-item');
    if (slides.length <= 1) return;

    slides[fundingSlideIdx].classList.remove('active');
    if (dots[fundingSlideIdx]) dots[fundingSlideIdx].classList.remove('active');

    fundingSlideIdx += direction;
    if (fundingSlideIdx >= slides.length) fundingSlideIdx = 0;
    if (fundingSlideIdx < 0) fundingSlideIdx = slides.length - 1;

    slides[fundingSlideIdx].classList.add('active');
    if (dots[fundingSlideIdx]) dots[fundingSlideIdx].classList.add('active');
}


/* --- [6. 펀딩 게이지바 계산 함수] --- */
function initFundingGauge() {
    const gaugeEl = document.getElementById('mainFundingGauge');
    if (!gaugeEl) return;

    const current = parseFloat(gaugeEl.getAttribute('data-current')) || 0;
    const target = parseFloat(gaugeEl.getAttribute('data-target')) || 1;
    const fillEl = document.getElementById('mainGaugeFill');
    const percentEl = document.getElementById('mainFundingPercent');
    const currentTextEl = document.getElementById('mainFundingCurrentText');
    const targetTextEl = document.getElementById('mainFundingTargetText');

    const percent = Math.min((current / target) * 100, 100);

    if (currentTextEl) currentTextEl.textContent = `₩ ${current.toLocaleString()}`;
    if (targetTextEl) targetTextEl.textContent = `목표 ₩ ${target.toLocaleString()}`;
    if (percentEl) percentEl.textContent = `${percent.toFixed(2)}%`;

    setTimeout(() => {
        if (fillEl) fillEl.style.width = `${percent}%`;
    }, 100);
}