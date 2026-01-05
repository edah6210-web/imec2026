/* =========================
   HTML Include Loader
   For Multi-page Static Site
========================= */

const BASE_PATH = ""; 
// 若之後部署在子目錄，例如：/conference2026
// 改成：const BASE_PATH = "/conference2026/";

function loadHTML(id, file) {
  const target = document.getElementById(id);
  if (!target) {
    console.warn(`⚠️ include.js: Element #${id} not found`);
    return;
  }

  fetch(`${BASE_PATH}/${file}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${file}`);
      }
      return response.text();
    })
    .then(html => {
      target.innerHTML = html;
    })
    .catch(error => {
      console.error("❌ include.js error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("site-header", "includes/header.html");
  loadHTML("site-footer", "includes/footer.html");
});
