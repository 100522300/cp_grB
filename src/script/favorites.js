/* Versión muy básica/noob: favoritos por usuario en localStorage */
const FAVORITES_PREFIX = "favorites_";
const LOGIN_KEY = "sesion"; // misma clave que usa el login

/* Devuelve el login actual o null */
function getCurrentUser() {
  try {
    const sesion = JSON.parse(localStorage.getItem(LOGIN_KEY) || "{}");
    return sesion.login || null;
  } catch (e) {
    return null;
  }
}

/* Lee favoritos de este usuario (array) */
function getFavorites(userId) {
  if (!userId) return [];
  const raw = localStorage.getItem(FAVORITES_PREFIX + userId);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

/* Guarda favoritos de este usuario */
function saveFavorites(userId, list) {
  if (!userId) return;
  localStorage.setItem(FAVORITES_PREFIX + userId, JSON.stringify(list));
}

/* Añade o quita un favorito y devuelve si quedó marcado */
function toggleFavorite(userId, item) {
  const list = getFavorites(userId);
  let foundIndex = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === item.id) {
      foundIndex = i;
      break;
    }
  }
  if (foundIndex !== -1) {
    list.splice(foundIndex, 1); // quitar
    saveFavorites(userId, list);
    return false; // ahora no es favorito
  } else {
    list.push(item); // añadir
    saveFavorites(userId, list);
    return true; // ahora sí es favorito
  }
}

/* Actualiza el aspecto del botón */
function markButton(btn, isFav) {
  btn.classList.toggle("is-fav", isFav);
  btn.setAttribute("aria-pressed", isFav ? "true" : "false");
  const title = btn.dataset.favTitle || "Favorito";
  btn.textContent = isFav ? "★ " + title : "⭐ Añadir a favoritos";
  btn.classList.add("pop");
  setTimeout(function () {
    btn.classList.remove("pop");
  }, 250);
}

/* Página de resultados: pinta estado y maneja clicks */
function initResultsFavorites() {
  const buttons = document.querySelectorAll(".añadir-a-favoritos");
  if (!buttons.length) return;

  const currentUser = getCurrentUser();
  const favorites = currentUser ? getFavorites(currentUser) : [];

  buttons.forEach(function (btn) {
    const favId = btn.dataset.favId;
    const favTitle = btn.dataset.favTitle || "Favorito";
    const favUrl = btn.dataset.favUrl || "resultados.html";

    const isFav = favorites.some(function (f) {
      return f.id === favId;
    });
    markButton(btn, isFav);

    btn.addEventListener("click", function () {
      const user = getCurrentUser();
      if (!user) {
        alert("Inicia sesión para guardar favoritos");
        window.location.href = "formulario_sesion.html";
        return;
      }
      const nowFav = toggleFavorite(user, {
        id: favId,
        title: favTitle,
        url: favUrl,
      });
      markButton(btn, nowFav);
    });
  });
}

/* Página de perfil: muestra la lista real y permite quitar */
function renderProfileFavorites() {
  const listEl = document.querySelector(".lista-favoritos");
  if (!listEl) return;

  const user = getCurrentUser();
  if (!user) {
    listEl.innerHTML = "<li>Inicia sesión para ver tus favoritos.</li>";
    return;
  }

  const favorites = getFavorites(user);
  listEl.innerHTML = "";

  if (!favorites.length) {
    listEl.innerHTML = "<li>No tienes favoritos guardados.</li>";
    return;
  }

  favorites.forEach(function (fav) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = fav.url || "#";
    a.textContent = fav.title || fav.id;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "✕";
    removeBtn.style.marginLeft = "0.5rem";
    removeBtn.addEventListener("click", function () {
      const list = getFavorites(user).filter(function (f) {
        return f.id !== fav.id;
      });
      saveFavorites(user, list);
      renderProfileFavorites();
    });

    li.appendChild(a);
    li.appendChild(removeBtn);
    listEl.appendChild(li);
  });
}

/* Al cargar la página, inicializa ambas cosas (cada una se activa solo si encuentra su HTML) */
document.addEventListener("DOMContentLoaded", function () {
  initResultsFavorites();
  renderProfileFavorites();
});
