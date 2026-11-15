// ===== Script compartilhado entre as páginas =====

// Tema claro/escuro (salvo no navegador)
const root = document.documentElement;
const themeBtn = document.querySelector("#theme-toggle");

function getSavedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeBtn) themeBtn.textContent = theme === "dark" ? "☀" : "☾";
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(getSavedTheme() || (prefersDark ? "dark" : "light"));

themeBtn?.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* navegação privada: ignora */
  }
});

// Menu mobile
const menuBtn = document.querySelector("#menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// Ano atual no rodapé
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
