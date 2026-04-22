import { lerp, isFinePointer, prefersReducedMotion, qsa } from "./utils.js";

export function initMagnetic() {
  if (!isFinePointer() || prefersReducedMotion()) return;

  qsa("[data-magnetic]").forEach((el) => {
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let hovering = false;
    const radius = 80;
    const strength = 0.28;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = e.clientX - (r.left + r.width / 2);
      const py = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(px, py);
      if (dist < r.width) {
        tx = px * strength;
        ty = py * strength;
      }
    };
    const onEnter = () => { hovering = true; };
    const onLeave = () => {
      hovering = false;
      tx = 0; ty = 0;
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    const tick = () => {
      cx = lerp(cx, tx, 0.18);
      cy = lerp(cy, ty, 0.18);
      el.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  });
}
