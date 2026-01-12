document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     Language detection
  ============================== */
  const isEN = location.pathname.startsWith("/en/");
  const currentPath = window.location.pathname;
  const fileName = currentPath.split("/").pop() || "index.html";

  const headerPath = isEN
    ? "/includes/header-en.html"
    : "/includes/header.html";

  const footerPath = isEN
    ? "/includes/footer-en.html"
    : "/includes/footer.html";

  /* =============================
     Load Header
  ============================== */
  fetch(headerPath)
    .then(res => {
      if (!res.ok) throw new Error("Header include failed");
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
      if (!res.ok) throw new Error("Footer include failed");
      return res.text();
    })
    .then(html => {
      const footerContainer = document.getElementById("site-footer");
      if (!footerContainer) return;

      footerContainer.innerHTML = html;
    })
    .catch(err => console.error(err));

  /* =============================
     Header behavior (single source)
  ============================== */
  function initHeaderBehavior() {
    const header = document.querySelector("#site-header header");
    const menuToggle = header?.querySelector(".menu-toggle");
    const nav = header?.querySelector("nav.main-nav");

    if (!header || !menuToggle || !nav) return;

    /* ===== Scroll glass effect ===== */
    const onScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add("header-glass");
        header.classList.remove("header-transparent");
      } else {
        header.classList.add("header-transparent");
        header.classList.remove("header-glass");
      }

      const menuClose = header.querySelector(".menu-close");

/* ===== 手機版 Menu Close (X) ===== */
menuClose?.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.remove("active");
});

    };

    onScroll();
    window.addEventListener("scroll", onScroll);

    /* ===== Mobile menu toggle ===== */
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("active");
    });

    /* Close menu after clicking link (mobile) */
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
      });
    });

    /* Click outside to close menu (mobile) */
    document.addEventListener("click", (e) => {
      if (!header.contains(e.target)) {
        nav.classList.remove("active");
      }
    });

    /* Ensure desktop menu always visible */
    window.addEventListener("resize", () => {
      if (window.innerWidth > 991) {
        nav.classList.remove("active");
      }
    });
  }

  /* =============================
     Language switch (ZH / EN)
  ============================== */
  function initLanguageSwitch() {
    const langEN = document.getElementById("lang-en");
    const langZH = document.getElementById("lang-zh");

    if (langEN) {
      langEN.href = "/en/" + fileName;
    }

    if (langZH) {
      langZH.href = "/" + fileName;
    }
  }

  /* =============================
     Active menu highlight
  ============================== */
  function setActiveMenu() {
    const navLinks = document.querySelectorAll("#site-header nav a");

    navLinks.forEach(link => {
      const linkPath = link.getAttribute("href");

      if (!linkPath) return;

      if (
        linkPath.endsWith("/" + fileName) ||
        linkPath === fileName ||
        linkPath === "/" + fileName ||
        linkPath === "/en/" + fileName
      ) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

});
