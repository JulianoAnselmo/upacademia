const KEY = "up-splash-seen";

export function initSplash() {
  const el = document.querySelector(".preloader") || document.querySelector(".splash");
  if (!el) return;
  if (sessionStorage.getItem(KEY)) {
    el.classList.add("is-cached");
    return;
  }
  sessionStorage.setItem(KEY, "1");
  setTimeout(() => el.remove(), 2400);
}
