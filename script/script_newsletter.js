"use strict";

/* ---- Imports ---- */
import { activar_suscripcion } from "./newsletter_storage.js";
import { mostrar_modal_newsletter, cerrar_modal_newsletter } from "./newsletter_view.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-newsletter");
  const btnCerrar = document.querySelector(".btn-cerrar-newsletter");
  const modal = document.querySelector(".modal-newsletter");

  /* Mantener el modal oculto hasta que haya un envio valido */
  if (modal) {
    modal.classList.remove("modal-visible");
    modal.style.display = "none";
  }

  if (btnCerrar) {
    btnCerrar.addEventListener("click", cerrar_modal_newsletter);
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const correoInput = document.getElementById("correo").value.trim();
    const politica = document.getElementById("aceptar-politica").checked;

    const sesion = JSON.parse(localStorage.getItem("sesion") || "{}");
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || {});
    const usuario = usuarios[sesion.login];

    if (!usuario) {
      alert("Debes iniciar sesion para suscribirte.");
      return;
    }

    if (correoInput !== usuario.correo) {
      alert("Debes usar el correo con el que te registraste.");
      return;
    }

    if (!politica) {
      alert("Debes aceptar la politica de privacidad.");
      return;
    }

    activar_suscripcion();
    mostrar_modal_newsletter();
  });
});
