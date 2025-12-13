"use strict";

/* ---- VALIDACIONES COMUNES ---- */

export function solo_letras(texto) {
  return /^[a-zA-ZñÑ\s]+$/.test(texto);
}

export function validar_nombre(nombre) {
  return /^[A-Za-zñÑ\s]{3,}$/.test(nombre);
}

export function validar_email(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validar_password(pass) {
  // Acepta cualquier símbolo (no alfanumérico), siempre que cumpla el resto de requisitos
  return /^(?=.*[a-z])(?=.*[A-Z])(?=(?:.*\d){2,})(?=.*[^A-Za-z0-9]).{8,}$/.test(pass);
}

export function validar_apellido(apellido) {
  return /^[A-Za-zñÑ]{3,}\s+[A-Za-zñÑ]{3,}.*$/.test(apellido);
}

/* ---- FECHAS ---- */

export function diaHoy() {
  return new Date().toISOString().slice(0, 10);
}

export function setMaxFecha(input) {
  if (input) input.setAttribute("max", diaHoy());
}
