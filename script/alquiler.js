/* Lógica para la página de alquiler - ACTUALIZADA CON PRECIO EN VIVO */
import { guardarReservaCoche } from "./reservas_almacen.js";

document.addEventListener("DOMContentLoaded", function () {

  // Cargar imagen de perfil
  const sesion = JSON.parse(localStorage.getItem("sesion"));
  if (sesion && sesion.imagen) {
    const imgPerfil = document.querySelector(".imagen-perfil-usuario");
    if (imgPerfil) {
      imgPerfil.src = sesion.imagen;
    }
  } else if (sesion && sesion.login) {
    // Fallback si no hay imagen en sesion pero si login (buscar en usuarios)
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    const usuario = usuarios[sesion.login];
    if (usuario && usuario.imagen) {
      const imgPerfil = document.querySelector(".imagen-perfil-usuario");
      if (imgPerfil) {
        imgPerfil.src = usuario.imagen;
      }
    }
  }

  /* Configurar la fecha mínima (mañana) */
  var input_fecha = document.getElementById("fecha-alquiler");

  if (input_fecha) {
    var hoy = new Date();
    hoy.setDate(hoy.getDate() + 1);
    var dia = String(hoy.getDate()).padStart(2, '0');
    var mes = String(hoy.getMonth() + 1).padStart(2, '0');
    var anio = hoy.getFullYear();
    input_fecha.min = anio + '-' + mes + '-' + dia;
  }

  /* Referencias a elementos para cálculo en vivo */
  var radios_coche = document.querySelectorAll('input[name="coche"]');
  var radios_cobertura = document.querySelectorAll('input[name="cobertura"]');
  var input_dias = document.getElementById("dias-alquiler");
  var select_edad = document.getElementById("rango-edad");
  var span_precio = document.getElementById("precio-total-valor");

  /* Función para recalcular precio */
  function calcularTotal() {
    var precio_total = 0;
    var dias = parseInt(input_dias.value) || 0;

    if (dias > 0) {
      /* Precio Coche */
      var coche = document.querySelector('input[name="coche"]:checked');
      if (coche) {
        precio_total += parseFloat(coche.getAttribute("data-precio"));
      }

      /* Precio Cobertura */
      var cob = document.querySelector('input[name="cobertura"]:checked');
      if (cob) {
        precio_total += parseFloat(cob.value);
      }

      /* Recargo Joven (ahora viene del select) */
      /* Si valor es "18", significa menor de 25 (+10/dia) */
      if (select_edad && select_edad.value === "18") {
        precio_total += 10;
      }

      /* Multiplicar por días */
      precio_total = precio_total * dias;
    }

    /* Actualizar DOM */
    if (span_precio) span_precio.textContent = precio_total;
  }

  /* Añadir listeners para recalcular en tiempo real */
  var elementos_a_escuchar = [input_dias, select_edad];
  radios_coche.forEach(r => elementos_a_escuchar.push(r));
  radios_cobertura.forEach(r => elementos_a_escuchar.push(r));

  elementos_a_escuchar.forEach(el => {
    if (el) el.addEventListener('change', calcularTotal);
    if (el) el.addEventListener('input', calcularTotal); // Para el input number
  });


  /* Escuchar el envío del formulario */
  var form = document.getElementById("form-alquiler");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Validaciones */

      var coche_seleccionado = document.querySelector('input[name="coche"]:checked');
      if (!coche_seleccionado) {
        alert("¡No has elegido coche! Por favor selecciona uno de la lista.");
        return;
      }

      var ciudad = document.getElementById("ciudad-recogida").value;
      if (!ciudad) {
        alert("Selecciona la ciudad de recogida.");
        return;
      }

      var dias = parseInt(document.getElementById("dias-alquiler").value);
      if (!dias || dias <= 0) {
        alert("Días no válidos.");
        return;
      }

      var fecha = document.getElementById("fecha-alquiler").value;
      if (!fecha) {
        alert("Falta la fecha de recogida.");
        return;
      }

      /* Edad ya está validada por ser select, solo recogemos valor */
      var es_joven = (select_edad.value === "18");

      /* Cobertura */
      var cobertura_input = document.querySelector('input[name="cobertura"]:checked');
      var nombre_cobertura = "Básica";
      if (cobertura_input && parseFloat(cobertura_input.value) > 0) {
        nombre_cobertura = "Completa (Sin Franquicia)";
      }

      /* Total final (recalculamos por seguridad) */
      var total = parseFloat(span_precio.textContent);


      /* Usuario */
      var login = "Invitado";
      var sesion_txt = localStorage.getItem("sesion");
      if (sesion_txt) {
        try {
          var sesion = JSON.parse(sesion_txt);
          if (sesion.login) login = sesion.login;
        } catch (e) { }
      }


      /* Mensaje Final */
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

      /* Guardar en Storage (si hay usuario) */
      var reservaObj = {
        coche: coche_seleccionado.getAttribute("data-modelo"),
        ciudad: ciudad,
        fecha: fecha,
        dias: dias,
        precioTotal: total,
        cobertura: nombre_cobertura
      };

      /* Intentamos guardar */
      /* Si devuelve false y estamos logueados, es por el limite */
      var sesion_activa = localStorage.getItem("sesion");
      if (sesion_activa) {
        var resultado = guardarReservaCoche(reservaObj);
        if (resultado === false) {
          alert("¡Ya tienes 2 coches reservados! No puedes reservar más por ahora.");
          return; /* Paramos aqui, no mostramos resumen ni reseteamos */
        }
      }

      alert(mensaje);

      /* Limpiar formulario */
      form.reset();
      /* Resetear visuales manuales */
      if (span_precio) span_precio.textContent = "0";
      actualizarSeleccion(); // Quita seleccionados
      document.querySelectorAll('.tarjeta-cobertura').forEach(c => c.style.borderColor = 'var(--border)');
      // Reset radio basic checked para visual
      var basic = document.querySelector('input[name="cobertura"][value="0"]');
      if (basic) {
        basic.checked = true;
        basic.closest('.tarjeta-cobertura').style.borderColor = '#007bff';
      }

    });
  }

  /* Efecto de selección visual en tarjetas */
  radios_coche.forEach(function (radio) {
    radio.addEventListener('change', actualizarSeleccion);
  });

  var radios_cob = document.querySelectorAll('input[name="cobertura"]');
  radios_cob.forEach(function (r) {
    r.addEventListener('change', function () {
      document.querySelectorAll('.tarjeta-cobertura').forEach(c => c.style.borderColor = 'var(--border)');
      r.closest('.tarjeta-cobertura').style.borderColor = '#007bff';
    });
  });

});

function actualizarSeleccion() {
  /* Quita clase seleccionado a todos */
  document.querySelectorAll('.tarjeta-coche').forEach(function (card) {
    card.classList.remove('seleccionado');
  });
  /* Pone al marcado */
  var checked = document.querySelector('input[name="coche"]:checked');
  if (checked) {
    var card = checked.closest('.tarjeta-coche');
    if (card) card.classList.add('seleccionado');
  }
}
