import { initHeader } from "./modules/header.js";
import { initCursor } from "./modules/cursor.js";
import { initMagnetic } from "./modules/magnetic.js";
import { initReveal } from "./modules/reveal.js";
import { initMarquee } from "./modules/marquee.js";
import { initCarousel } from "./modules/carousel.js";
import { initModal } from "./modules/modal.js";
import { initParallax } from "./modules/parallax.js";
import { initHours } from "./modules/hours.js";
import { initProgress } from "./modules/progress.js";
import { initSplash } from "./modules/splash.js";
import { initStats } from "./modules/stats.js";
import { initStickyBar } from "./modules/stickybar.js";
import { initWhatsappFab } from "./modules/whatsapp-fab.js";

document.documentElement.classList.add("js-enabled");

const bootstrap = () => {
  const hero = document.querySelector(".hero");
  if (hero) requestAnimationFrame(() => hero.classList.add("is-loaded"));

  initSplash();
  initProgress();
  initHeader();
  initReveal();
  initMarquee();
  initCarousel();
  initModal();
  initHours();
  initMagnetic();
  initCursor();
  initParallax();
  initStats();
  initStickyBar();
  initWhatsappFab();

  const yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}
