"use strict";

import { obtenerReservas } from "./reservas_storage.js";

/* ---- Pintar reservas actuales ---- */
export function pintarReservas() {
  const grid = document.querySelector(".reservas-section .grid-reservas");
  const gridPasadas = document.querySelector(".reservas-section .grid-pasadas");
  if (!grid) return;

  const reservas = obtenerReservas();

  if (!reservas.length) {
    grid.innerHTML = "<p>No tienes reservas todavía.</p>";
    return;
  }

  grid.innerHTML = "";

  reservas.forEach((r) => {
    const article = document.createElement("article");
    article.className = "tarjeta-reserva";

    article.innerHTML = `
      <p class="reserva-titulo">${r.destino}</p>
      <p class="reserva-detalle">
        Fecha: ${r.salida} - ${r.regreso}<br />
        Pasajeros: ${r.pasajeros} persona${r.pasajeros > 1 ? "s" : ""}<br />
        Precio: <span class="js-price" data-eur="${Number(r.precio) || 0}"></span>
      </p>
    `;

    grid.appendChild(article);

    if (gridPasadas) {
      const pasada = document.createElement("article");
      pasada.className = "tarjeta-reserva pasada";
      pasada.innerHTML = `
        <p class="reserva-titulo">${r.destino}</p>
        <p class="reserva-detalle">Fecha: ${r.salida} - ${r.regreso}<br />Valorar: ★★★★★</p>
        <input type="text" class="input-opinion" placeholder="Introduce tu opinión..." />
        <img src="images/enviar.png" alt="Enviar" class="icono-enviar" />
      `;
      gridPasadas.appendChild(pasada);
    }
  });

  // Fuerza repintado de monedas tras añadir las tarjetas dinámicamente
  const selector = document.getElementById("currency-select");
  if (selector) {
    selector.dispatchEvent(new Event("change"));
  }
}

document.addEventListener("DOMContentLoaded", pintarReservas);
