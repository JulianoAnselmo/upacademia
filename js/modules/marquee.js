import { qsa } from "./utils.js";

export function initMarquee() {
  qsa(".marquee-track").forEach((track) => {
    if (track.dataset.cloned) return;
    const items = Array.from(track.children).map((c) => c.cloneNode(true));
    items.forEach((node) => {
      node.setAttribute("aria-hidden", "true");
      track.appendChild(node);
    });
    track.dataset.cloned = "true";
  });
}
