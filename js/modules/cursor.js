import { lerp, isFinePointer, prefersReducedMotion, qsa } from "./utils.js";

export function initCursor() {
  if (!isFinePointer() || prefersReducedMotion()) return;

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  dot.className = "cursor-dot";
  ring.className = "cursor-ring";
  dot.setAttribute("aria-hidden", "true");
  ring.setAttribute("aria-hidden", "true");
  document.body.append(dot, ring);

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let rx = mx, ry = my;

  window.addEventListener("pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  const tick = () => {
    rx = lerp(rx, mx, 0.18);
    ry = lerp(ry, my, 0.18);
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  };
  tick();

  const label = document.createElement("span");
  label.className = "cursor-label";
  ring.appendChild(label);

  const setLabel = (t) => { label.textContent = t || ""; ring.classList.toggle("has-label", !!t); };

  qsa("a, button, .card, .ig-tile, .team-card, .goal-pick, [data-cursor]").forEach((el) => {
    const cue = el.dataset.cursor;
    const hint = cue === "grow" ? "" :
      el.matches(".ig-tile") ? "ver" :
      el.matches(".card, .team-card") ? "saber+" :
      el.matches(".btn-primary") ? "" :
      el.matches("a[href^='https://wa.me']") ? "whats" :
      el.matches("a[target='_blank']") ? "abrir↗" : "";
    el.addEventListener("pointerenter", () => {
      ring.classList.add("is-grow");
      if (hint) setLabel(hint);
    });
    el.addEventListener("pointerleave", () => {
      ring.classList.remove("is-grow");
      setLabel("");
    });
  });

  document.addEventListener("pointerleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("pointerenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
}
