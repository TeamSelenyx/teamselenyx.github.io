/* 카드 등장 옵저버 */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("show"); });
}, { threshold: 0.15 });
document.querySelectorAll(".card").forEach(c => observer.observe(c));

/* 메뉴 클릭 효과 */
const menuItems = document.querySelectorAll('.interactive[data-menu]');
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    const menuType = item.getAttribute('data-menu');
    const targets = document.querySelectorAll(`[data-menu="${menuType}"]`);
    targets.forEach(el => el.classList.add('clicked'));
    setTimeout(() => targets.forEach(el => el.classList.remove('clicked')), 300);
  });
});

/* 마우스 추적 보더 효과 */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  });
});

/* 슬라이더 로직 */
const slideData = [
  { img: "https://picsum.photos/1200/600?random=10", title: "Center Stage", desc: "중앙 정렬은 가장 안정적이고 주목도가 높습니다.<br>메인 메시지를 전달할 때 적합합니다.", pos: "pos-center", link: "#page1", btnText: "시작하기" },
  { img: "https://picsum.photos/1200/600?random=11", title: "Bottom Right", desc: "우측 하단 배치는 배경 이미지를 시원하게 보여주면서<br>세련된 느낌을 줍니다.", pos: "pos-bottom-right", link: "#page2", btnText: "더 알아보기" },
  { img: "https://picsum.photos/1200/600?random=12", title: "Bottom Left", desc: "좌측 하단은 시선의 흐름이 자연스럽고<br>안정적인 구도를 제공합니다.", pos: "pos-bottom-left", link: "#page3", btnText: "갤러리 이동" }
];

let slideIndex = 0;
let autoSlideInterval;
const slideDuration = 5000;

const bgElem = document.getElementById('carouselBg');
const boxElem = document.getElementById('carouselBox');
const titleElem = document.getElementById('carouselTitle');
const descElem = document.getElementById('carouselDesc');
const btnElem = document.getElementById('carouselBtn');
const indicatorsContainer = document.getElementById('indicators');

slideData.forEach((_, i) => {
  const bar = document.createElement('div');
  bar.className = 'indicator-bar' + (i === 0 ? ' active' : '');
  bar.onclick = () => { slideIndex = i; updateSlide(); resetTimer(); };
  indicatorsContainer.appendChild(bar);
});

function moveSlide(n) {
  slideIndex += n;
  if (slideIndex >= slideData.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slideData.length - 1;
  updateSlide();
  resetTimer();
}

function updateSlide() {
  const data = slideData[slideIndex];
  const bars = document.querySelectorAll('.indicator-bar');
  
  boxElem.classList.add('fade-out');
  
  setTimeout(() => {
    bgElem.style.backgroundImage = `url('${data.img}')`;
    titleElem.innerText = data.title;
    descElem.innerHTML = data.desc;
    btnElem.innerText = data.btnText;
    btnElem.setAttribute('href', data.link);
    
    boxElem.className = `carousel-content-box ${data.pos}`;
    if(boxElem.classList.contains('fade-out')) boxElem.classList.add('fade-out');

    bars.forEach((b, i) => {
      b.className = 'indicator-bar';
      if (i === slideIndex) { setTimeout(() => b.classList.add('active'), 10); }
    });

    boxElem.classList.remove('fade-out');
  }, 300);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveSlide(1);
  }, slideDuration);
}

function resetTimer() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

startAutoSlide();