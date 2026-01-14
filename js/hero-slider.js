const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let current = 0;

function showSlide(index) {
    // 確保 slides[index] 真的存在才執行 classList
    if (slides[index]) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

setInterval(() => {
  let next = (current + 1) % slides.length;
  showSlide(next);
}, 6000);

// 在你的 showSlide 函式內加入這行判斷
function showSlide(index) {
  if (!slides[index] || !dots[index]) return; // ⚠️ 關鍵防錯：如果索引不存在就跳出

  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));

  slides[index].classList.add('active');
  dots[index].classList.add('active');
}
