/* =========================
   HTML Include Loader
========================= */

const BASE_PATH = ""; // GitHub Pages 用空字串

function loadHTML(id, file) {
  const target = document.getElementById(id);
  if (!target) return;

  // ⭐⭐⭐ 重點在這一行 ⭐⭐⭐
  fetch(`${BASE_PATH}${file}`)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(html => {
      target.innerHTML = html;
    })
    .catch(err => {
      console.error("include error:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("site-header", "includes/header.html");
  loadHTML("site-footer", "includes/footer.html");
});
