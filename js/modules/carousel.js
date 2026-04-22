import { qs, qsa, prefersReducedMotion } from "./utils.js";

export function initCarousel() {
  const stage = qs(".testimonial-stage");
  if (!stage) return;
  const slides = qsa(".testimonial", stage);
  const prev = qs("[data-testimonial-prev]");
  const next = qs("[data-testimonial-next]");
  const progress = qs(".testimonial-progress");
  const index = qs(".testimonial-index");
  if (!slides.length) return;

  let i = 0;
  const duration = 7000;
  let t0 = performance.now();
  let raf;
  let paused = false;

  const show = (n) => {
    slides[i].classList.remove("is-active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("is-active");
    if (index) index.textContent = `${String(i + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    t0 = performance.now();
  };

  const tick = (now) => {
    if (!paused && !prefersReducedMotion()) {
      const el = now - t0;
      const pct = Math.min(100, (el / duration) * 100);
      if (progress) progress.style.setProperty("--progress", `${pct}%`);
      if (el >= duration) show(i + 1);
    }
    raf = requestAnimationFrame(tick);
  };

  prev?.addEventListener("click", () => show(i - 1));
  next?.addEventListener("click", () => show(i + 1));
  stage.addEventListener("pointerenter", () => { paused = true; });
  stage.addEventListener("pointerleave", () => { paused = false; t0 = performance.now(); });

  show(0);
  raf = requestAnimationFrame(tick);
}
