"use strict";

/* ---- Parámetros URL ---- */
const params = new URLSearchParams(window.location.search);
const destino = params.get("destino");

/* ---- DOM ---- */
const subtitulo = document.querySelector(".subtitulo-destino");

/* ---- Acción ---- */
if (destino && subtitulo) {
  subtitulo.textContent = `Destino: ${destino}`;
}
