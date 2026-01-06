const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let current = 0;

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  current = index;
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => showSlide(i));
});

setInterval(() => {
  let next = (current + 1) % slides.length;
  showSlide(next);
}, 6000);
