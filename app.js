const menuButton = document.querySelector(".menu-button");
const menuDialog = document.querySelector("#mobile-menu");
const menuClose = menuDialog?.querySelector(".menu-close");
const navToggles = document.querySelectorAll(".nav-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const closePanels = () => {
  navToggles.forEach((button) => {
    button.setAttribute("aria-expanded", "false");
    document.getElementById(button.getAttribute("aria-controls"))?.setAttribute("hidden", "");
  });
};

const closeMenu = () => {
  if (menuDialog?.open) menuDialog.close();
};

menuButton?.addEventListener("click", () => {
  closePanels();
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
});

menuDialog?.querySelectorAll(".mobile-acc").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const open = button.getAttribute("aria-expanded") === "true";

    menuDialog.querySelectorAll(".mobile-acc").forEach((other) => {
      other.setAttribute("aria-expanded", "false");
      document.getElementById(other.getAttribute("aria-controls"))?.setAttribute("hidden", "");
    });

    if (!open && panel) {
      button.setAttribute("aria-expanded", "true");
      panel.removeAttribute("hidden");
    }
  });
});

navToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const open = button.getAttribute("aria-expanded") === "true";
    closePanels();

    if (!open && panel) {
      button.setAttribute("aria-expanded", "true");
      panel.removeAttribute("hidden");
      panel.querySelector("a")?.focus();
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closePanels();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const selector = link.getAttribute("href");
    if (!selector || selector === "#") return;
    const target = document.querySelector(selector);
    if (!target) return;

    event.preventDefault();
    closeMenu();
    closePanels();

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

menuDialog?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => closeMenu());
});

const copyLink = document.querySelector("#copy-link");
copyLink?.addEventListener("click", async () => {
  const labelNode = copyLink.querySelector(".v-share__button-label");
  const label = labelNode ? labelNode.textContent : "Скопировать ссылку";
  const setLabel = (text) => {
    if (labelNode) labelNode.textContent = text;
    else copyLink.textContent = text;
  };

  try {
    await navigator.clipboard.writeText(window.location.href);
    setLabel("Ссылка скопирована");
  } catch {
    setLabel("Скопируйте адрес из строки браузера");
  }

  window.setTimeout(() => setLabel(label), 2000);
});
