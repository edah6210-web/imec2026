document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     Header / Footer include
  ============================== */
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("site-header").innerHTML = html;
      initHeaderBehavior(); // ★ header 載入完成後才初始化
    });

  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("site-footer").innerHTML = html;
    });

  /* =============================
     Header 行為（唯一來源）
  ============================== */
  function initHeaderBehavior() {
    const header = document.querySelector("#site-header header");
    const menuToggle = header?.querySelector(".menu-toggle");
    const nav = header?.querySelector("nav.main-nav");

    if (!header || !menuToggle || !nav) return;

    /* ===== 捲動玻璃效果（桌機＋手機共用） ===== */
    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add("header-glass");
        header.classList.remove("header-transparent");
      } else {
        header.classList.add("header-transparent");
        header.classList.remove("header-glass");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    /* ===== 手機版 Menu Toggle ===== */
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // 防止冒泡
      nav.classList.toggle("active");
    });

    /* 點選選單後自動收合（手機） */
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });

    /* 點空白處自動關閉 menu（手機） */
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        nav.classList.remove("active");
      }
    });

    /* ===== 桌機版確保永遠顯示 ===== */
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) {
        nav.classList.remove("active");
      }
    });
  }
});
