"use strict";

/* ---- Mostrar modal de suscripcion ---- */
export function mostrar_modal_newsletter() {
  const modal = document.querySelector(".modal-newsletter");
  if (!modal) return;

  modal.classList.add("modal-visible");
  modal.style.display = "flex";
}

/* ---- Cerrar modal ---- */
export function cerrar_modal_newsletter() {
  const modal = document.querySelector(".modal-newsletter");
  if (!modal) return;

  modal.classList.remove("modal-visible");
  modal.style.display = "none";
}

/* ---- Actualizar estado visual en perfil ---- */
export function mostrar_suscripcion_activa() {
  const texto = document.querySelector(".estado-newsletter");
  if (texto) {
    texto.textContent = "Suscripcion activa";
  }
}
