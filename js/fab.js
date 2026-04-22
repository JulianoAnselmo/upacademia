import { initWhatsappFab } from "./modules/whatsapp-fab.js";

document.documentElement.classList.add("js-enabled");

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWhatsappFab);
} else {
  initWhatsappFab();
}
