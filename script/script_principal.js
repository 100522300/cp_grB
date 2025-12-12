"use strict";

/* ----Imports---- */
import { 
  obtener_usuario_actual 
} from "./usuario_storage.js";
import { 
  establecer_usuario 
} from "./usuario_view.js";

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
