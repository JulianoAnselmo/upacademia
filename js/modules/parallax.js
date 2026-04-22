import { lerp, prefersReducedMotion, qsa } from "./utils.js";

export function initParallax() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia("(max-width: 760px)").matches) return;

  const items = qsa("[data-parallax]").map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallax) || 0.2,
    current: 0,
    target: 0,
  }));
  if (!items.length) return;

  const update = () => {
    const vh = window.innerHeight;
    items.forEach((it) => {
      const r = it.el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      it.target = -center * it.speed;
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();

  const tick = () => {
    items.forEach((it) => {
      it.current = lerp(it.current, it.target, 0.08);
      it.el.style.transform = `translate3d(0, ${it.current.toFixed(2)}px, 0)`;
    });
    requestAnimationFrame(tick);
  };
  tick();
}
