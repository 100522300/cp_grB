"use strict";

/*
  - Se ejecuta solo en index.html
  - Si hay sesión activa, redirige a pagina_principal.html
*/

import { obtener_usuario_actual } from "./usuario_storage.js";

document.addEventListener("DOMContentLoaded", function () {
  const usuario = obtener_usuario_actual();

  // Si hay usuario en sesión, no permitir permanecer en index
  if (usuario) {
    window.location.href = "pagina_principal.html";
  }
});
