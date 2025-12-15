"use strict";

import { guardarReservaCoche } from "./reservas_almacen.js";

function actualizarSeleccion() {
  document.querySelectorAll(".tarjeta-coche").forEach(function (card) {
    card.classList.remove("seleccionado");
  });

  var checked = document.querySelector('input[name="coche"]:checked');
  if (checked) {
    var card = checked.closest(".tarjeta-coche");
    if (card) card.classList.add("seleccionado");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  if (sesion && sesion.imagen) {
    const imgPerfil = document.querySelector(".imagen-perfil-usuario");
    if (imgPerfil) imgPerfil.src = sesion.imagen;
  } else if (sesion && sesion.login) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    const usuario = usuarios[sesion.login];
    if (usuario && usuario.imagen) {
      const imgPerfil = document.querySelector(".imagen-perfil-usuario");
      if (imgPerfil) imgPerfil.src = usuario.imagen;
    }
  }

  var input_fecha = document.getElementById("fecha-alquiler");
  if (input_fecha) {
    var hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    var dia = String(hoy.getDate()).padStart(2, "0");
    var mes = String(hoy.getMonth() + 1).padStart(2, "0");
    var anio = hoy.getFullYear();
    input_fecha.min = anio + "-" + mes + "-" + dia;
  }

  var radios_coche = document.querySelectorAll('input[name="coche"]');
  var radios_cobertura = document.querySelectorAll('input[name="cobertura"]');
  var input_dias = document.getElementById("dias-alquiler");
  var select_edad = document.getElementById("rango-edad");
  var span_precio = document.getElementById("precio-total-valor");

  function calcularTotal() {
    var precio_total = 0;
    var dias = parseInt(input_dias.value) || 0;

    if (dias > 0) {
      var coche = document.querySelector('input[name="coche"]:checked');
      if (coche) {
        precio_total += parseFloat(coche.getAttribute("data-precio"));
      }

      var cob = document.querySelector('input[name="cobertura"]:checked');
      if (cob) {
        precio_total += parseFloat(cob.value);
      }

      if (select_edad && select_edad.value === "18") {
        precio_total += 10;
      }

      precio_total = precio_total * dias;
    }

    if (span_precio) span_precio.textContent = precio_total;
  }

  var elementos_a_escuchar = [];
  if (input_dias) elementos_a_escuchar.push(input_dias);
  if (select_edad) elementos_a_escuchar.push(select_edad);
  radios_coche.forEach((r) => elementos_a_escuchar.push(r));
  radios_cobertura.forEach((r) => elementos_a_escuchar.push(r));

  elementos_a_escuchar.forEach((el) => {
    el.addEventListener("change", calcularTotal);
    el.addEventListener("input", calcularTotal);
  });

  var form = document.getElementById("form-alquiler");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var coche_seleccionado = document.querySelector('input[name="coche"]:checked');
      if (!coche_seleccionado) {
        alert("¡No has elegido coche! Por favor selecciona uno de la lista.");
        return;
      }

      var ciudadEl = document.getElementById("ciudad-recogida");
      var ciudad = ciudadEl ? ciudadEl.value : "";
      if (!ciudad) {
        alert("Selecciona la ciudad de recogida.");
        return;
      }

      var diasEl = document.getElementById("dias-alquiler");
      var dias = diasEl ? parseInt(diasEl.value) : 0;
      if (!dias || dias <= 0) {
        alert("Días no válidos.");
        return;
      }

      var fechaEl = document.getElementById("fecha-alquiler");
      var fecha = fechaEl ? fechaEl.value : "";
      if (!fecha) {
        alert("Falta la fecha de recogida.");
        return;
      }

      var es_joven = select_edad && select_edad.value === "18";

      var cobertura_input = document.querySelector('input[name="cobertura"]:checked');
      var nombre_cobertura = "Básica";
      if (cobertura_input && parseFloat(cobertura_input.value) > 0) {
        nombre_cobertura = "Completa (Sin Franquicia)";
      }

      var total = span_precio ? parseFloat(span_precio.textContent) : 0;

      var login = "Invitado";
      var sesion_txt = localStorage.getItem("sesion");
      if (sesion_txt) {
        try {
          var sesion2 = JSON.parse(sesion_txt);
          if (sesion2 && sesion2.login) login = sesion2.login;
        } catch (e) {}
      }

      var mensaje = "RESUMEN DE RESERVA\n------------------------\n";
      mensaje += "Cliente: " + login + "\n";
      mensaje += "Conductor: " + (es_joven ? "Menor de 25 años (Tasa incluida)" : "Mayor de 25 años") + "\n";
      mensaje += "Ciudad de recogida: " + ciudad + "\n";
      mensaje += "Fecha: " + fecha + "\n";
      mensaje += "------------------------\n";
      mensaje += "Vehículo: " + coche_seleccionado.getAttribute("data-modelo") + "\n";
      mensaje += "Duración: " + dias + " días\n";
      mensaje += "Cobertura: " + nombre_cobertura + "\n";
      mensaje += "------------------------\n";
      mensaje += "PRECIO TOTAL: " + total + "€\n";
      mensaje += "(Pago en mostrador. Recuerde llevar DNI y Carnet)";

      var reservaObj = {
        coche: coche_seleccionado.getAttribute("data-modelo"),
        ciudad: ciudad,
        fecha: fecha,
        dias: dias,
        precioTotal: total,
        cobertura: nombre_cobertura,
      };

      var sesion_activa = localStorage.getItem("sesion");
      if (sesion_activa) {
        var resultado = guardarReservaCoche(reservaObj);
        if (resultado === false) {
          alert("¡Ya tienes 1 coche reservado! No puedes reservar más por ahora.");
          return;
        }
      }

      alert(mensaje);

      form.reset();
      if (span_precio) span_precio.textContent = "0";
      actualizarSeleccion();

      document.querySelectorAll(".tarjeta-cobertura").forEach((c) => (c.style.borderColor = "var(--border)"));
      var basic = document.querySelector('input[name="cobertura"][value="0"]');
      if (basic) {
        basic.checked = true;
        var card = basic.closest(".tarjeta-cobertura");
        if (card) card.style.borderColor = "#007bff";
      }
    });
  }

  radios_coche.forEach(function (radio) {
    radio.addEventListener("change", actualizarSeleccion);
  });

  var radios_cob = document.querySelectorAll('input[name="cobertura"]');
  radios_cob.forEach(function (r) {
    r.addEventListener("change", function () {
      document.querySelectorAll(".tarjeta-cobertura").forEach((c) => (c.style.borderColor = "var(--border)"));
      var card = r.closest(".tarjeta-cobertura");
      if (card) card.style.borderColor = "#007bff";
    });
  });

  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      { pageLanguage: "es", layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
      "google_translate_element"
    );
  }

  window.googleTranslateElementInit = googleTranslateElementInit;

  const btnTraductor = document.getElementById("activar-traductor");
  if (btnTraductor) {
    btnTraductor.addEventListener("click", function () {
      const cont = document.getElementById("google_translate_element");
      if (cont) cont.hidden = false;

      if (window.google && window.google.translate) return;

      if (document.querySelector('script[data-gt="1"]')) return;

      const s = document.createElement("script");
      s.setAttribute("data-gt", "1");
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(s);
    });
  }
});
