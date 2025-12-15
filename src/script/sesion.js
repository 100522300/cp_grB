"use strict";

const form = document.querySelector(".form-sesion");
const email = document.getElementById("correo");
const password = document.getElementById("password");

function iniciarSesion(e) {
  e.preventDefault();

  const mail = email.value.trim();
  const pass = password.value.trim();

  if (!mail || !pass) {
    alert("Completa todos los campos.");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "{}");

  // Buscar usuario por correo
  const usuarioEncontrado = Object.values(usuarios).find(
    (u) => u.correo === mail
  );

  if (!usuarioEncontrado) {
    alert("No existe ninguna cuenta con ese correo.");
    return;
  }

  if (usuarioEncontrado.password !== pass) {
    alert("Contraseña incorrecta.");
    return;
  }

  // Guardar datos de sesión
  localStorage.setItem(
    "sesion",
    JSON.stringify({ login: usuarioEncontrado.login })
  );

  // Marcar sesión como activa
  //localStorage.setItem("sesionActiva", "true");

  window.location.href = "pagina_principal.html";
}

form.addEventListener("submit", iniciarSesion);
