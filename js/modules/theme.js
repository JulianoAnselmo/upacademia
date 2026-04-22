const KEY = "up-theme";

export function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem(KEY);
  if (saved === "dark" || saved === "light") root.setAttribute("data-theme", saved);

  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    const apply = () => {
      if (next === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
      localStorage.setItem(KEY, next);
    };
    if (document.startViewTransition) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  });
}
