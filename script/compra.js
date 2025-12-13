"use strict";

/* ---- Validaciones locales (sin módulos) ---- */
function validarNombre(nombre) {
  return /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ\s]{3,}$/.test(nombre);
}
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validarNumeroTarjeta(num) {
  return /^(?:\d{13}|\d{15}|\d{16}|\d{19})$/.test(num);
}
function validarCVV(v) {
  return /^\d{3}$/.test(v);
}

/* ---- Seleccionamos elementos del DOM ---- */
const form = document.querySelector(".form-compra");
const fechaSalida = document.getElementById("fecha-salida");
const fechaRegreso = document.getElementById("fecha-regreso");
const correo = document.getElementById("correo");
const btnAcompanante = document.getElementById("btn-acompanante");
const contenedorAcompanantes = document.getElementById("contenedor-acompanantes");
const botonesMascota = document.querySelectorAll(".fila-botones-mascota .boton-opcion");
const tipoMascota = document.getElementById("tipo-mascota");
const tamanoMascota = document.getElementById("tamano-mascota");
const titular = document.getElementById("titular");
const numeroTarjeta = document.getElementById("numero-tarjeta");
const caducidad = document.getElementById("caducidad");
const cvv = document.getElementById("cvv");

let contadorAcompanantes = 0;

/* ---- Funciones del programa ---- */
function diaHoy() {
  return new Date().toISOString().slice(0, 10);
}
function setMinFecha(input) {
  if (input) input.setAttribute("min", diaHoy());
}
function parseFechaISO(valor) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) return null;
  const fecha = new Date(valor);
  return Number.isNaN(fecha.getTime()) ? null : fecha;
}

function caducidadValida(valor) {
  if (!/^\d{4}-\d{2}$/.test(valor)) return false;
  const [anio, mes] = valor.split("-").map(Number);
  const finMes = new Date(anio, mes, 0);
  const hoy = new Date();
  finMes.setHours(23, 59, 59, 999);
  return finMes >= hoy;
}

function toggleMascota(activoBoton) {
  botonesMascota.forEach((btn) => btn.classList.remove("activo"));
  activoBoton.classList.add("activo");
  const requiereMascota = activoBoton.textContent.trim().toLowerCase().startsWith("s");
  botonesMascota.forEach((btn) => {
    btn.style.backgroundColor = "";
  });
  activoBoton.style.backgroundColor = requiereMascota ? "#c8f5d1" : "#f5c8c8";
  tipoMascota.disabled = !requiereMascota;
  tamanoMascota.disabled = !requiereMascota;
  if (!requiereMascota) {
    tipoMascota.value = "";
    tamanoMascota.value = "";
  }
}
function crearAcompanante() {
  contadorAcompanantes++;
  const fila = document.createElement("div");
  fila.classList.add("fila-doble");
  fila.innerHTML = `
    <div class="campo-compra">
      <label>Acompañante ${contadorAcompanantes}</label>
      <input type="text" name="acompanante_nombre_${contadorAcompanantes}" placeholder="Nombre">
    </div>
    <div class="campo-compra">
      <label class="label-espaciador"></label>
      <input type="email" name="acompanante_email_${contadorAcompanantes}" placeholder="Email">
    </div>
  `;
  contenedorAcompanantes.appendChild(fila);
}
function validarAcompanante(nombreVal, emailVal) {
  const nombreOk = nombreVal.trim() === "" || validarNombre(nombreVal.trim());
  const emailOk = emailVal.trim() === "" || validarEmail(emailVal.trim());
  if (nombreVal.trim() === "" && emailVal.trim() === "") return true;
  if (!nombreVal.trim() || !emailVal.trim()) return false;
  return nombreOk && emailOk;
}

/* ---- Validación del formulario ---- */
function validar_formulario_compra(e) {
  e.preventDefault();

  const salida = parseFechaISO(fechaSalida.value.trim());
  if (!salida) {
    alert("Fecha de salida inválida.");
    fechaSalida.focus();
    return;
  }
  const regreso = parseFechaISO(fechaRegreso.value.trim());
  if (!regreso) {
    alert("Fecha de regreso inválida.");
    fechaRegreso.focus();
    return;
  }
  if (salida > regreso) {
    alert("La fecha de regreso debe ser posterior o igual a la de salida.");
    fechaRegreso.focus();
    return;
  }

  const mail = correo.value.trim();
  if (!validarEmail(mail)) {
    alert("Correo electrónico no válido.");
    correo.focus();
    return;
  }

  const filasExtras = contenedorAcompanantes?.querySelectorAll(".fila-doble") || [];
  for (const fila of filasExtras) {
    const inputs = fila.querySelectorAll("input");
    const nom = inputs[0]?.value.trim() || "";
    const em = inputs[1]?.value.trim() || "";
    if (!nom || !em) {
      alert("Completa nombre y email del acompañante añadido.");
      inputs[0]?.focus();
      return;
    }
    if (!validarAcompanante(nom, em)) {
      alert("Revisa los datos de los acompañantes añadidos (nombre y email válidos).");
      inputs[0]?.focus();
      return;
    }
  }

  const btnActivo = Array.from(botonesMascota).find((btn) => btn.classList.contains("activo"));
  if (!btnActivo) {
    alert("Indica si viajas con mascota (Sí o No).");
    return;
  }
  const requiereMascota = btnActivo.textContent.trim().toLowerCase().startsWith("s");
  if (requiereMascota) {
    if (!tipoMascota.value.trim() || !tamanoMascota.value.trim()) {
      alert("Completa tipo y tamaño de la mascota.");
      tipoMascota.focus();
      return;
    }
  }

  const tit = titular.value.trim();
  if (!validarNombre(tit)) {
    alert("El titular debe tener al menos 3 letras.");
    titular.focus();
    return;
  }

  const numTarjeta = numeroTarjeta.value.trim();
  if (!validarNumeroTarjeta(numTarjeta)) {
    alert("Número de tarjeta inválido: 13, 15, 16 o 19 dígitos.");
    numeroTarjeta.focus();
    return;
  }

  const cad = caducidad.value.trim();
  if (!caducidadValida(cad)) {
    alert("Caducidad inválida. Usa MM/YY o MM/YYYY y que no esté caducada.");
    caducidad.focus();
    return;
  }

  const cvvVal = cvv.value.trim();
  if (!validarCVV(cvvVal)) {
    alert("El CVV debe tener exactamente 3 dígitos.");
    cvv.focus();
    return;
  }

  alert("Compra realizada correctamente.");
  form.reset();
  botonesMascota.forEach((btn) => btn.classList.remove("activo"));
  botonesMascota.forEach((btn) => (btn.style.backgroundColor = ""));
}

/* ---- Acciones ---- */
if (btnAcompanante) {
  btnAcompanante.addEventListener("click", crearAcompanante);
}
if (botonesMascota.length) {
  botonesMascota.forEach((btn) => {
    btn.addEventListener("click", () => toggleMascota(btn));
  });
}
if (form) {
  setMinFecha(fechaSalida);
  setMinFecha(fechaRegreso);
  form.addEventListener("submit", validar_formulario_compra);
}
