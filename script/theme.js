const THEME_KEY = "theme";

function applyTheme(button, mode) {
  const isDark = mode === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  if (button) {
    button.textContent = isDark ? "Modo claro" : "Modo oscuro";
  }
}

function initTheme() {
  const btn = document.getElementById("theme-toggle");
  const saved = localStorage.getItem(THEME_KEY);
  const initial = saved === "dark" ? "dark" : "light";
  applyTheme(btn, initial);

  if (btn) {
    btn.addEventListener("click", () => {
      const nextMode = document.body.classList.contains("theme-dark") ? "light" : "dark";
      applyTheme(btn, nextMode);
      localStorage.setItem(THEME_KEY, nextMode);
    });
  }
}

document.addEventListener("DOMContentLoaded", initTheme);
