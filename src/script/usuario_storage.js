"use strict";

/* ----Funciones de almacenamiento---- */

// Obtiene la sesion actual
export function obtener_sesion() {
  return JSON.parse(localStorage.getItem("sesion") || "{}");
}

// Obtiene todos los usuarios
export function obtener_usuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "{}");
}

// Guarda los usuarios en localStorage
export function guardar_usuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

// Obtiene el usuario actualmente logueado
export function obtener_usuario_actual() {
  const sesion = obtener_sesion();
  if (!sesion.login) return null;

  const usuarios = obtener_usuarios();
  return usuarios[sesion.login] || null;
}
