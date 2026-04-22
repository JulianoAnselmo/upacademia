import { qs, qsa } from "./utils.js";

export function initModal() {
  const modal = qs("#modal-agendar");
  if (!modal) return;
  const openers = qsa("[data-open-modal='agendar']");
  const closers = qsa("[data-close-modal]", modal);
  const form = qs("form", modal);

  const open = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => modal.showModal());
    } else {
      modal.showModal();
    }
  };
  const close = () => modal.close();

  openers.forEach((b) => b.addEventListener("click", (e) => { e.preventDefault(); open(); }));
  closers.forEach((b) => b.addEventListener("click", close));

  modal.addEventListener("click", (e) => {
    const r = modal.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      close();
    }
  });

  if (form?.dataset.multistep !== undefined) initMultistep(form);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = clean(data.get("nome"));
    const whats = clean(data.get("whatsapp"));
    const objetivo = clean(data.get("objetivo"));
    const horario = clean(data.get("horario"));

    if (nome.length < 2 || !isValidPhone(whats) || !objetivo) return;

    const msg =
      `Olá! Sou ${nome}. Gostaria de agendar uma visita à UP Academia.` +
      `\n\nObjetivo: ${objetivo}` +
      (horario ? `\nHorário preferido: ${horario}` : "") +
      (whats ? `\nMeu WhatsApp: ${whats}` : "");

    const url = `https://wa.me/5516996151525?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
    close();
    form.reset();
    resetSteps(form);
  });
}

function clean(v) {
  return (v || "").toString().replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 200);
}
function isValidPhone(v) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}
function setError(input, show) {
  const id = input.getAttribute("aria-describedby");
  const el = id ? document.getElementById(id) : null;
  input.setAttribute("aria-invalid", show ? "true" : "false");
  input.classList.toggle("is-invalid", show);
  if (el) el.hidden = !show;
}

function initMultistep(form) {
  const steps = qsa(".step", form);
  const pills = qsa("[data-step-pill]", form);
  const nexts = qsa("[data-step-next]", form);
  const backs = qsa("[data-step-prev]", form);
  const picks = qsa(".goal-pick", form);
  const objInput = qs("#m-obj", form);

  const show = (idx) => {
    steps.forEach((s, i) => s.classList.toggle("is-current", i === idx));
    pills.forEach((p, i) => {
      p.classList.toggle("is-active", i === idx);
      p.classList.toggle("is-done", i < idx);
    });
  };

  let current = 0;
  nexts.forEach((b) => b.addEventListener("click", () => {
    if (current === 0) {
      const nome = qs("#m-nome", form);
      const whats = qs("#m-whats", form);
      const nomeOk = nome.value.trim().length >= 2;
      const whatsOk = isValidPhone(whats.value);
      setError(nome, !nomeOk);
      setError(whats, !whatsOk);
      if (!nomeOk || !whatsOk) { (!nomeOk ? nome : whats).focus(); return; }
    }
    if (current === 1) {
      const objOk = !!objInput.value;
      setError(objInput, !objOk);
      if (!objOk) return;
    }
    current = Math.min(steps.length - 1, current + 1);
    show(current);
  }));

  qs("#m-nome", form)?.addEventListener("input", (e) => { if (e.target.value.trim().length >= 2) setError(e.target, false); });
  qs("#m-whats", form)?.addEventListener("input", (e) => { if (isValidPhone(e.target.value)) setError(e.target, false); });
  backs.forEach((b) => b.addEventListener("click", () => {
    current = Math.max(0, current - 1);
    show(current);
  }));
  picks.forEach((p) => p.addEventListener("click", () => {
    picks.forEach((o) => o.classList.remove("is-selected"));
    p.classList.add("is-selected");
    objInput.value = p.dataset.goal;
    setError(objInput, false);
  }));

  form._resetSteps = () => {
    current = 0; show(0);
    picks.forEach((o) => o.classList.remove("is-selected"));
    qsa("[aria-invalid]", form).forEach((el) => setError(el, false));
  };
}

function resetSteps(form) { form._resetSteps && form._resetSteps(); }
