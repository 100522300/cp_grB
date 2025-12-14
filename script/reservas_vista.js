import { obtenerReservas, obtenerReservasCoches, eliminarReservaCoche } from "./reservas_almacen.js";

/* Funcion para pintar las reservas de viajes */
export function pintarReservas() {
  var gridActuales = document.querySelector(".reservas-section .grid-reservas");


  if (!gridActuales) {
    return;
  }

  var reservas = obtenerReservas();

  /* Limpiamos lo que habia antes */
  gridActuales.innerHTML = "";

  if (reservas.length === 0) {
    var parrafo = document.createElement("p");
    parrafo.textContent = "No tienes reservas todavía.";
    gridActuales.appendChild(parrafo);
    return;
  }

  for (var i = 0; i < reservas.length; i++) {
    var r = reservas[i];

    /* Creamos la tarjeta de reserva */
    var articulo = document.createElement("article");
    articulo.className = "tarjeta-reserva";

    var titulo = document.createElement("p");
    titulo.className = "reserva-titulo";
    titulo.textContent = r.destino;

    var detalle = document.createElement("p");
    detalle.className = "reserva-detalle";

    /* Montamos el texto del detalle */
    var texto = "Fecha: " + r.salida + " - " + r.regreso + "<br>";
    texto = texto + "Pasajeros: " + r.pasajeros + "<br>";
    texto = texto + "Precio: <span class='js-price' data-eur='" + r.precio + "'></span>";

    detalle.innerHTML = texto;

    articulo.appendChild(titulo);
    articulo.appendChild(detalle);

    gridActuales.appendChild(articulo);
  }

  /* Actualizar la moneda si existe el selector */
  var selector = document.getElementById("currency-select");
  if (selector) {
    selector.dispatchEvent(new Event("change"));
  }
}

/* Funcion para pintar las reservas de coches */
export function pintarReservasCoches() {
  var gridCoches = document.querySelector(".grid-coches-reservados");
  if (!gridCoches) {
    return;
  }

  var reservas = obtenerReservasCoches();

  /* Limpiar */
  gridCoches.innerHTML = "";

  if (reservas.length === 0) {
    var p = document.createElement("p");
    p.textContent = "No tienes coches reservados.";
    gridCoches.appendChild(p);
    return;
  }

  for (var i = 0; i < reservas.length; i++) {
    /* Usamos una funcion anonima para capturar el indice 'i' correctamente si hiciera falta,
       pero con let/var en bucles simples funciona bien aquí. */
    var r = reservas[i];
    var indice = i;

    var articulo = document.createElement("article");
    articulo.className = "tarjeta-reserva";

    var titulo = document.createElement("p");
    titulo.className = "reserva-titulo";
    titulo.textContent = "🚗 " + r.coche;

    var detalle = document.createElement("p");
    detalle.className = "reserva-detalle";

    var info = "Ciudad: " + r.ciudad + "<br>";
    info = info + "Fecha: " + r.fecha + " (" + r.dias + " días)<br>";
    info = info + "Cobertura: " + r.cobertura + "<br>";
    info = info + "Total: <span class='js-price' data-eur='" + r.precioTotal + "'></span>";

    detalle.innerHTML = info;

    var botonCancelar = document.createElement("button");
    botonCancelar.textContent = "Cancelar reserva";
    /* Estilos directos simples */
    botonCancelar.style.marginTop = "1rem";
    botonCancelar.style.padding = "0.5rem";
    botonCancelar.style.backgroundColor = "red";
    botonCancelar.style.color = "white";
    botonCancelar.style.border = "none";
    botonCancelar.style.cursor = "pointer";

    /* El truco para el boton y el indice */
    (function (elIndice, elNombre) {
      botonCancelar.onclick = function () {
        var confirmacion = confirm("¿Seguro que quieres cancelar la reserva del " + elNombre + "?");
        if (confirmacion) {
          eliminarReservaCoche(elIndice);
          pintarReservasCoches();
        }
      };
    })(indice, r.coche);

    articulo.appendChild(titulo);
    articulo.appendChild(detalle);
    articulo.appendChild(botonCancelar);

    gridCoches.appendChild(articulo);
  }

  var selector = document.getElementById("currency-select");
  if (selector) {
    selector.dispatchEvent(new Event("change"));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  pintarReservas();
  pintarReservasCoches();
});
