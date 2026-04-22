const WA_NUMBER = "5516996151525";
const WA_MESSAGE = "Oi, quero agendar uma avaliação na UP Academia.";
const SHOW_AFTER_MS = 800;
const SHOW_AFTER_SCROLL = 200;
const COLLAPSE_AFTER_SCROLL = 200;

export const initWhatsappFab = () => {
  if (document.querySelector(".whatsapp-fab")) return;

  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
  const fab = document.createElement("a");
  fab.className = "whatsapp-fab";
  fab.href = href;
  fab.target = "_blank";
  fab.rel = "noopener noreferrer";
  fab.setAttribute("aria-label", "Agendar avaliação pelo WhatsApp");
  fab.innerHTML = `
    <span class="whatsapp-fab__icon" aria-hidden="true">
      <svg viewBox="0 0 32 32" width="26" height="26" fill="currentColor">
        <path d="M16 3C9 3 3.4 8.6 3.4 15.5c0 2.4.7 4.7 1.9 6.7L3 29l7-1.8c1.9 1 4.1 1.6 6.3 1.6h.1c6.9 0 12.5-5.6 12.5-12.5S23 3 16 3zm7.3 17.8c-.3.9-1.8 1.7-2.5 1.8-.7.1-1.5.1-2.4-.2-.6-.2-1.3-.4-2.2-.8-3.9-1.7-6.5-5.6-6.7-5.9-.2-.3-1.6-2.2-1.6-4.1 0-2 1-3 1.4-3.4.4-.4.9-.5 1.2-.5h.9c.3 0 .7-.1 1.1.8.4.9 1.3 3.1 1.4 3.3.1.2.2.4 0 .7-.1.3-.2.4-.4.7-.2.2-.4.5-.6.7-.2.2-.4.4-.2.8.2.4 1 1.6 2.2 2.7 1.5 1.3 2.8 1.7 3.2 1.9.4.2.6.2.8-.1.2-.3.9-1.1 1.2-1.4.3-.4.6-.3 1-.2.4.1 2.6 1.2 3 1.5.4.2.7.3.8.5.1.3.1 1.2-.2 2.1z"/>
      </svg>
    </span>
    <span class="whatsapp-fab__label">Agendar avaliação</span>
  `;
  document.body.appendChild(fab);

  let revealed = false;
  const reveal = () => {
    if (revealed) return;
    revealed = true;
    fab.classList.add("is-visible");
  };

  setTimeout(reveal, SHOW_AFTER_MS);

  const onScroll = () => {
    if (window.scrollY > SHOW_AFTER_SCROLL) reveal();
    fab.classList.toggle("is-collapsed", window.scrollY > COLLAPSE_AFTER_SCROLL);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
};
