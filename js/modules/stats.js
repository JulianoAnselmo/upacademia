export function initStats() {
  const nodes = document.querySelectorAll("[data-count-to]");
  if (!nodes.length) return;

  const animate = (node) => {
    const target = parseInt(node.dataset.countTo, 10) || 0;
    const suffix = node.querySelector("em");
    const start = performance.now();
    const dur = 1400;
    const step = (t) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      const v = Math.round(target * eased);
      node.firstChild.nodeValue = v;
      if (suffix) node.appendChild(suffix);
      if (k < 1) requestAnimationFrame(step);
    };
    node.firstChild ? (node.firstChild.nodeValue = "0") : (node.textContent = "0");
    if (suffix) node.appendChild(suffix);
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  nodes.forEach((n) => io.observe(n));
}
