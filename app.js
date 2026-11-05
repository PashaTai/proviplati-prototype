const menuButton = document.querySelector(".menu-button");
const menuDialog = document.querySelector("#mobile-menu");
const menuClose = menuDialog?.querySelector(".menu-close");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const closeMenu = () => {
  if (menuDialog?.open) menuDialog.close();
};

menuButton?.addEventListener("click", () => {
  menuDialog?.showModal();
  menuButton.setAttribute("aria-expanded", "true");
  menuClose?.focus();
});

menuClose?.addEventListener("click", closeMenu);

menuDialog?.addEventListener("click", (event) => {
  if (event.target === menuDialog) closeMenu();
});

menuDialog?.addEventListener("close", () => {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.focus();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const selector = link.getAttribute("href");
    const target = document.querySelector(selector);

    if (!target) return;

    event.preventDefault();
    closeMenu();

    target.scrollIntoView({
      behavior: reducedMotion.matches ? "auto" : "smooth",
      block: "start",
    });

    if (target.hasAttribute("tabindex")) {
      window.setTimeout(() => target.focus({ preventScroll: true }), reducedMotion.matches ? 0 : 220);
    }

    window.history.replaceState(null, "", selector);
  });
});
