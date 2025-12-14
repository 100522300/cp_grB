"use strict";

/* ---- Sesión ---- */
function obtenerSesion() {
  return JSON.parse(localStorage.getItem("sesion") || "{}");
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios") || "{}");
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

/* ---- Guardar reserva ---- */
export function guardarReserva(reserva) {
  const sesion = obtenerSesion();
  if (!sesion.login) return;

  const usuarios = obtenerUsuarios();
  const usuario = usuarios[sesion.login];

  if (!usuario.reservas) {
    usuario.reservas = [];
  }

  usuario.reservas.push(reserva);
  guardarUsuarios(usuarios);
}

/* ---- Obtener reservas ---- */
export function obtenerReservas() {
  const sesion = obtenerSesion();
  if (!sesion.login) return [];

  const usuarios = obtenerUsuarios();
  return usuarios[sesion.login]?.reservas || [];
}
