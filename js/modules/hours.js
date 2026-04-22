import { qs } from "./utils.js";

export function initHours() {
  const meta = qs(".hero-meta");
  if (!meta) return;

  const update = () => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const open = day >= 1 && day <= 5 && hour >= 7 && hour < 19;
    const label = meta.querySelector(".label");
    if (open) {
      meta.classList.remove("is-closed");
      if (label) label.textContent = "Aberto agora · Seg–Sex · 07h–19h";
    } else {
      meta.classList.add("is-closed");
      if (label) {
        if (day === 0 || day === 6) label.textContent = "Fechado · abre seg 07h";
        else if (hour < 7) label.textContent = "Abre hoje às 07h";
        else label.textContent = "Fechado · volta amanhã 07h";
      }
    }
  };
  update();
  setInterval(update, 60 * 1000);
}
