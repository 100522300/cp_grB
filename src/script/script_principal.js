"use strict";

/* ----Imports---- */
import { obtener_usuario_actual } from "./usuario_storage.js";
import { establecer_usuario } from "./usuario_view.js";

/* ----Acciones del programa---- */
document.addEventListener("DOMContentLoaded", function () {
  const usuario = obtener_usuario_actual();
  if (!usuario) return;

  establecer_usuario(usuario);

  const btnPerfil = document.querySelector(".boton-perfil");
  if (btnPerfil) {
    btnPerfil.addEventListener("click", function () {
      window.location.href = "perfil.html";
    });
  }
});

/* Para responsividad, mostrar/ocultar menu hamburguesa */
document.addEventListener("DOMContentLoaded", function () {
  // 1. Obtener los elementos
  const hamburgerBtn = document.getElementById("hamburger-menu");
  const menuContainer = document.getElementById("menu-colapsable");

  // 2. Agregar un "escuchador de eventos" (event listener) al botón
  hamburgerBtn.addEventListener("click", function () {
    // 3. Alternar la clase 'active' en el contenedor del menú.
    // El CSS se encarga de mostrar/ocultar cuando esta clase está presente.
    menuContainer.classList.toggle("active");

    // Opcional: Cambiar el ícono del botón (por ejemplo, de ☰ a X)
    if (menuContainer.classList.contains("active")) {
      hamburgerBtn.innerHTML = "&#10005;"; // Ícono 'X'
      hamburgerBtn.setAttribute("aria-expanded", "true");
    } else {
      hamburgerBtn.innerHTML = "&#9776;"; // Ícono '☰'
      hamburgerBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Opcional: Cerrar el menú si se hace clic en un enlace dentro de él (para navegación)
  const menuLinks = menuContainer.querySelectorAll("a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuContainer.classList.remove("active");
      hamburgerBtn.innerHTML = "&#9776;"; // Volver al ícono '☰'
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });
});
