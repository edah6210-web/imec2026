/**
 * menu.js - 支援動態載入 Header 的選單控制
 */
document.addEventListener("click", (e) => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const backdrop = document.querySelector(".nav-backdrop");

  // 如果選單元素尚未載入，則不執行
  if (!toggle || !nav || !backdrop) return;

  // 1. 開啟選單 (點擊漢堡按鈕)
  if (toggle.contains(e.target)) {
    nav.classList.add("active");
    backdrop.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // 2. 關閉選單 (點擊關閉按鈕、遮罩、或選單內的連結)
  else if (
    e.target.closest(".menu-close") || 
    e.target === backdrop || 
    (e.target.tagName === "A" && nav.contains(e.target))
  ) {
    nav.classList.remove("active");
    backdrop.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
    nav.setAttribute("aria-hidden", "true");
    
    // 等待過渡動畫結束後恢復滾動
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 400);
  }
});

/* ESC 鍵關閉機制 */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const nav = document.querySelector(".main-nav");
    const backdrop = document.querySelector(".nav-backdrop");
    const toggle = document.querySelector(".menu-toggle");

    if (nav && nav.classList.contains("active")) {
      nav.classList.remove("active");
      if (backdrop) backdrop.classList.remove("active");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  }
});
