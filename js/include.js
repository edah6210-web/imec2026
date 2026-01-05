/* =========================
   HTML Include Loader
   Auto Base Path (Local / GitHub Pages)
========================= */

function getBasePath() {
  const { hostname, pathname } = window.location;

  // GitHub Pages（repo 模式）
  if (hostname.endsWith("github.io")) {
    const repo = pathname.split("/")[1];
    return `/${repo}/`;
  }

  // 本機 or 自訂網域
  return "";
}

const BASE_PATH = getBasePath();
// console.log("BASE_PATH =", BASE_PATH); // 除錯用

function loadHTML(id, file) {
  const target = document.getElementById(id);
  if (!target) return;

  fetch(`${BASE_PATH}${file}`)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(html => {
      target.innerHTML = html;
    })
    .catch(err => console.error("include.js error:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("site-header", "includes/header.html");
  loadHTML("site-footer", "includes/footer.html");
});
