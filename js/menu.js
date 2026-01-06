document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  const closeBtn = document.querySelector(".menu-close");
  const backdrop = document.querySelector(".nav-backdrop");

  function openMenu() {
    nav.classList.add("active");
    backdrop.classList.add("active");

    toggle.setAttribute("aria-expanded", "true");
    nav.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
  nav.classList.remove("active");
  backdrop.classList.remove("active");

  toggle.setAttribute("aria-expanded", "false");
  nav.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    document.body.style.overflow = "";
  }, 400); // ⚠️ 要 >= CSS transition
}


  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* ESC 關閉 */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      closeMenu();
    }
  });
});
