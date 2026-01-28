/* UI 업데이트 (헤더 및 플로팅 메뉴 표시) */
const mainHeader = document.getElementById('mainHeader');
const floatingLogo = document.getElementById('floatingLogo');
const floatingMenu = document.getElementById('floatingMenu');
const mobileFloating = document.getElementById('mobileFloating');

function updateUI() {
  const triggerHeight = mainHeader.offsetHeight;
  const isPastHeader = window.scrollY >= triggerHeight;
  const isMobile = window.innerWidth <= 900;
  
  floatingLogo.classList.toggle("show", isPastHeader);
  floatingMenu.classList.toggle("show", isPastHeader && !isMobile);
  if (isMobile) mobileFloating.classList.add("show");
  else mobileFloating.classList.remove("show");
}
window.addEventListener("scroll", updateUI);
window.addEventListener("resize", updateUI);
updateUI();

/* 스크롤 유리 효과 로직 */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 600; 
  const progress = Math.min(scrollY / maxScroll, 1); 

  const blurValue = 4 + (progress * 46); 
  const opacityValue = 0.1 + (progress * 0.15); 

  document.documentElement.style.setProperty('--current-blur', `${blurValue}px`);
  document.documentElement.style.setProperty('--current-overlay', opacityValue);
});