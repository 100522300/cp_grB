"use strict";

import { obtenerReservas } from "./reservas_storage.js";

/* ---- Pintar reservas actuales y pasadas ---- */
export function pintarReservas() {
  const gridActuales = document.querySelector(
    ".reservas-section .grid-reservas"
  );
  const gridPasadas = document.querySelector(
    ".reservas-section .grid-pasadas"
  );

  if (!gridActuales) return;

  const reservas = obtenerReservas();

  // Limpiamos contenedores
  gridActuales.innerHTML = "";
  if (gridPasadas) gridPasadas.innerHTML = "";

  if (!reservas.length) {
    const p = document.createElement("p");
    p.textContent = "No tienes reservas todavía.";
    gridActuales.appendChild(p);
    return;
  }

  reservas.forEach((r) => {
    /* ---------- RESERVA ACTUAL ---------- */
    const article = document.createElement("article");
    article.className = "tarjeta-reserva";

    const pTitulo = document.createElement("p");
    pTitulo.className = "reserva-titulo";
    pTitulo.textContent = r.destino;

    const pDetalle = document.createElement("p");
    pDetalle.className = "reserva-detalle";

    const textoFecha = document.createTextNode(
      `Fecha: ${r.salida} - ${r.regreso}`
    );
    const br1 = document.createElement("br");

    const textoPasajeros = document.createTextNode(
      `Pasajeros: ${r.pasajeros} persona${r.pasajeros > 1 ? "s" : ""}`
    );
    const br2 = document.createElement("br");

    const textoPrecio = document.createTextNode("Precio: ");
    const spanPrecio = document.createElement("span");
    spanPrecio.className = "js-price";
    spanPrecio.dataset.eur = Number(r.precio) || 0;

    pDetalle.appendChild(textoFecha);
    pDetalle.appendChild(br1);
    pDetalle.appendChild(textoPasajeros);
    pDetalle.appendChild(br2);
    pDetalle.appendChild(textoPrecio);
    pDetalle.appendChild(spanPrecio);

    article.appendChild(pTitulo);
    article.appendChild(pDetalle);

    gridActuales.appendChild(article);

    /* ---------- RESERVA PASADA (opcional) ---------- */
    if (gridPasadas) {
      const pasada = document.createElement("article");
      pasada.className = "tarjeta-reserva pasada";

      const pTituloPasada = document.createElement("p");
      pTituloPasada.className = "reserva-titulo";
      pTituloPasada.textContent = r.destino;

      const pDetallePasada = document.createElement("p");
      pDetallePasada.className = "reserva-detalle";
      pDetallePasada.textContent = `Fecha: ${r.salida} - ${r.regreso}`;

      const inputOpinion = document.createElement("input");
      inputOpinion.type = "text";
      inputOpinion.className = "input-opinion";
      inputOpinion.placeholder = "Introduce tu opinión...";

      const imgEnviar = document.createElement("img");
      imgEnviar.src = "images/enviar.png";
      imgEnviar.alt = "Enviar";
      imgEnviar.className = "icono-enviar";

      pasada.appendChild(pTituloPasada);
      pasada.appendChild(pDetallePasada);
      pasada.appendChild(inputOpinion);
      pasada.appendChild(imgEnviar);

      gridPasadas.appendChild(pasada);
    }
  });

  /* ---- Forzamos actualización de moneda ---- */
  const selector = document.getElementById("currency-select");
  if (selector) {
    selector.dispatchEvent(new Event("change"));
  }
}

document.addEventListener("DOMContentLoaded", pintarReservas);
