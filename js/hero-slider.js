/**
 * hero-slider.js
 */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let current = 0;

function showSlide(index) {
  // 1. 防錯機制：確保索引對應的元素都存在
  if (!slides[index] || !dots[index]) return;

  // 2. 移除所有 active 狀態
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  // 3. 加入新的 active 狀態
  slides[index].classList.add('active');
  dots[index].classList.add('active');

  // 4. 重要：更新目前的索引值，否則自動播放會出錯
  current = index;
}

// 點擊點點切換
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
  });
});

// 自動播放
setInterval(() => {
  // 計算下一張的索引
  let next = (current + 1) % slides.length;
  showSlide(next);
}, 6000);
