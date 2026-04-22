import { qs, qsa } from "./utils.js";

export function initHeader() {
  const header = qs(".site-header");
  const menu = qs(".mobile-menu");
  const toggle = qs(".menu-toggle");
  if (!header) return;

  const hero = qs(".hero");
  const heroIsDark = hero && (hero.classList.contains("hero-v4") || hero.dataset.theme === "dark");
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    if (heroIsDark) {
      const threshold = hero.offsetHeight - 80;
      header.classList.toggle("over-dark", y < threshold);
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.textContent = open ? "fechar" : "menu";
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    qsa("a", menu).forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.textContent = "menu";
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      })
    );
  }
}
