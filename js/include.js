/* =========================
   HTML Include Loader
   GitHub Pages Repo-safe Version
========================= */

const BASE_PATH = "/imec2026/"; // ⭐⭐⭐ 一定要是 repo 名稱 ⭐⭐⭐

function loadHTML(id, file) {
  const target = document.getElementById(id);
  if (!target) return;

  fetch(`${BASE_PATH}${file}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load ${BASE_PATH}${file}`);
      }
      return res.text();
    })
    .then(html => {
      target.innerHTML = html;
    })
    .catch(err => {
      console.error("include.js error:", err);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("site-header", "includes/header.html");
  loadHTML("site-footer", "includes/footer.html");
});
