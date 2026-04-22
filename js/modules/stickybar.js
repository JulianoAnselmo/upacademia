export function initStickyBar() {
  const bar = document.querySelector(".sticky-bar");
  if (!bar) return;
  const hero = document.querySelector(".hero");
  const threshold = () => (hero ? hero.offsetHeight * 0.6 : 400);
  const onScroll = () => {
    bar.classList.toggle("is-visible", window.scrollY > threshold());
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
