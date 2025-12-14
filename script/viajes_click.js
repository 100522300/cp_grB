"use strict";

/* ---- Seleccionamos todos los viajes ---- */
const viajes = document.querySelectorAll(".viaje-premium");

/* ---- Click en un viaje ---- */
viajes.forEach((viaje) => {
  viaje.addEventListener("click", () => {
    // Comprobamos sesión SOLO al hacer click
    const usuario = JSON.parse(localStorage.getItem("sesion"));

    if (!usuario) {
      // Si quieres, puedes mostrar un alert en lugar de redirigir
      // alert("Debes iniciar sesión para comprar este viaje");
      window.location.href = "formulario_sesion.html";
      return;
    }

    const destino = viaje.dataset.destino;
    const precio = viaje.dataset.precio;

    if (!destino || !precio) return;

    const url = `compra.html?destino=${encodeURIComponent(
      destino
    )}&precio=${precio}`;
    window.location.href = url;
  });
});
