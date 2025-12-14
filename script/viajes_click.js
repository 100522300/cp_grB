"use strict";

/* ---- Seleccionamos todos los viajes ---- */
const viajes = document.querySelectorAll(".viaje-premium");

/* ---- Click en un viaje ---- */
viajes.forEach((viaje) => {
  viaje.addEventListener("click", () => {
    const destino = viaje.dataset.destino;
    const precio = viaje.dataset.precio;

    if (!destino || !precio) return;

    const url = `compra.html?destino=${encodeURIComponent(destino)}&precio=${precio}`;
    window.location.href = url;
  });
});
