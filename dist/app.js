const dialogTriggers = document.querySelectorAll("[data-dialog]");
const dialogs = document.querySelectorAll("dialog");
const menuButton = document.querySelector(".menu-button");

const openDialog = (dialog, trigger) => {
  if (!dialog) return;

  dialog.__trigger = trigger;
  dialog.showModal();

  if (dialog.id === "mobile-menu") {
    menuButton.setAttribute("aria-expanded", "true");
  }

  const firstControl = dialog.querySelector(".dialog-close, a, button");
  firstControl?.focus();
};

dialogTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openDialog(document.getElementById(trigger.dataset.dialog), trigger);
  });
});

dialogs.forEach((dialog) => {
  dialog.querySelectorAll(".dialog-close").forEach((button) => {
    button.addEventListener("click", () => dialog.close());
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    if (dialog.id === "mobile-menu") {
      menuButton.setAttribute("aria-expanded", "false");
    }

    if (dialog.__trigger?.isConnected) dialog.__trigger.focus();
  });
});
