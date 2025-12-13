"use strict";

/* ---- Obtener usuario actual ---- */
function obtener_usuario_actual() {
  const sesion = JSON.parse(localStorage.getItem("sesion") || "{}");
  if (!sesion.login) return null;

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
  return usuarios[sesion.login] || null;
}

/* ---- Activar suscripcion ---- */
export function activar_suscripcion() {
  const sesion = JSON.parse(localStorage.getItem("sesion") || "{}");
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");

  if (!sesion.login || !usuarios[sesion.login]) return;

  usuarios[sesion.login].newsletter = true;
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/* ---- Comprobar suscripcion ---- */
export function tiene_suscripcion() {
  const usuario = obtener_usuario_actual();
  return usuario?.newsletter === true;
}
