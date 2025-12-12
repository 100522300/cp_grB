"use strict";

import {
  validar_nombre,
  validar_email,
  validar_password,
  validar_apellido,
  setMaxFecha
} from "./datos.js";

/* ---- Selección exacta según tu HTML ---- */
const form = document.querySelector(".form-registro");
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const correo = document.getElementById("correo");
const correo2 = document.getElementById("correo2");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const fecha = document.getElementById("fecha");
const login = document.getElementById("login");
const imagen = document.getElementById("imagen");

/*FUNCIONES*/

function validarFormulario(e) {
  e.preventDefault();

  // Nombre
  const nom = nombre.value.trim();
  if (!validar_nombre(nom)) {
    alert("El nombre debe tener al menos 3 letras.");
    return;
  }

  // Apellidos
  const ape = apellidos.value.trim();
  if (!validar_apellido(ape)) {
    alert("Introduce al menos dos apellidos de 3 letras.");
    return;
  }

  // Correos
  const mail1 = correo.value.trim();
  const mail2 = correo2.value.trim();

  if (!validar_email(mail1)) {
    alert("Correo electrónico no válido.");
    return;
  }
  if (mail1 !== mail2) {
    alert("Los correos no coinciden.");
    return;
  }

  // Contraseñas
  const pass1 = password.value.trim();
  const pass2 = password2.value.trim();

  if (!validar_password(pass1)) {
    alert("La contraseña no cumple los requisitos.");
    return;
  }
  if (pass1 !== pass2) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  // Fecha de nacimiento
  const hoy = new Date().toISOString().slice(0, 10);

  if (!fecha.value || fecha.value > hoy) {
    alert("Fecha de nacimiento no válida.");
    return;
  }

  // Login / usuario
  const user = login.value.trim();
  if (user.length < 5) {
    alert("El nombre de usuario debe tener mínimo 5 caracteres.");
    return;
  }

  // Imagen
  const archivo = imagen.files[0];
  const tiposValidos = ["image/png", "image/jpeg", "image/webp"];

  if (!archivo || !tiposValidos.includes(archivo.type)) {
    alert("Debes subir una imagen válida (PNG, JPG o WEBP).");
    return;
  }

  // Convertir imagen a Base64
  const reader = new FileReader();

  reader.onload = function () {
    const imgBase64 = reader.result;

    const usuario = {
      nombre: nom,
      apellidos: ape,
      correo: mail1,
      login: user,
      password: pass1,
      imagen: imgBase64
    };

    // Guardar usuario
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");
    usuarios[user] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Guardar sesión
    localStorage.setItem("sesion", JSON.stringify({ login: user }));

    // Redirigir
    window.location.href = "pagina_principal.html";
  };

  reader.readAsDataURL(archivo);
}

setMaxFecha(fecha);
form.addEventListener("submit", validarFormulario);
