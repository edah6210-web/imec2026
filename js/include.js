document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     Detect base path (GitHub Pages safe)
     e.g. /imec2026/index.html → /imec2026
  ============================== */
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const repoBase = pathParts.length > 0 ? `/${pathParts[0]}` : "";

  const isEN = window.location.pathname.includes("/en/");
  const fileName = pathParts[pathParts.length - 1] || "index.html";

  /* =============================
     Correct include paths
  ============================== */
  const headerPath = isEN
    ? `${repoBase}/includes/header-en.html`
    : `${repoBase}/includes/header.html`;

  const footerPath = isEN
    ? `${repoBase}/includes/footer-en.html`
    : `${repoBase}/includes/footer.html`;

  /* =============================
     Load Header
  ============================== */
  fetch(headerPath)
    .then(res => {
      if (!res.ok) throw new Error("Header include failed: " + headerPath);
      return res.text();
    })
    .then(html => {
      const headerContainer = document.getElementById("site-header");
      if (!headerContainer) return;

      headerContainer.innerHTML = html;
      initHeaderBehavior();
      initLanguageSwitch();
      setActiveMenu();
    })
    .catch(err => console.error(err));

  /* =============================
     Load Footer
  ============================== */
  fetch(footerPath)
    .then(res => {
      if (!res.ok) throw new Error("Footer include failed: " + footerPath);
      return res.text();
    })
    .then(html => {
      const footerContainer = document.getElementById("site-footer");
      if (!footerContainer) return;

      footerContainer.innerHTML = html;
    })
    .catch(err => console.error(err));

  /* =============================
     Header behavior
  ============================== */
  function initHeaderBehavior() {
    const header = document.querySelector("#site-header header");
    const menuToggle = header?.querySelector(".menu-toggle");
    const nav = header?.querySelector("nav.main-nav");
    const menuClose = header?.querySelector(".menu-close");

    if (!header || !menuToggle || !nav) return;

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

    menuToggle.addEventListener("click", e => {
      e.stopPropagation();
      nav.classList.toggle("active");
    });

    menuClose?.addEventListener("click", e => {
      e.stopPropagation();
      nav.classList.remove("active");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });

    document.addEventListener("click", e => {
      if (!header.contains(e.target)) {
        nav.classList.remove("active");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) {
        nav.classList.remove("active");
      }
    });
  }

  /* =============================
     Language switch
  ============================== */
  function initLanguageSwitch() {
    const langEN = document.getElementById("lang-en");
    const langZH = document.getElementById("lang-zh");

    if (langEN) {
      langEN.href = isEN ? fileName : `en/${fileName}`;
    }

    if (langZH) {
      langZH.href = isEN ? `../${fileName}` : fileName;
    }
  }

  /* =============================
     Active menu
  ============================== */
  function setActiveMenu() {
    document.querySelectorAll("#site-header nav a").forEach(link => {
      const href = link.getAttribute("href");
      if (!href) return;
      link.classList.toggle("is-active", href.endsWith(fileName));
    });
  }

});
