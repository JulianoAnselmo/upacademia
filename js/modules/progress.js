export function initProgress() {
  const el = document.querySelector(".scroll-progress");
  if (!el) return;
  let raf = 0;
  const update = () => {
    raf = 0;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    el.style.setProperty("--p", p.toFixed(2) + "%");
  };
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
}
