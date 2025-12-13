"use strict";

/* ----Imports---- */
import {
  obtener_usuario_actual,
  obtener_sesion,
  obtener_usuarios,
  guardar_usuarios,
} from "./usuario_storage.js";

import {
  establecer_nombre_usuario,
  establecer_correo_usuario,
  establecer_imagen_usuario,
} from "./usuario_view.js";
import { 
  tiene_suscripcion 
} from "./newsletter_storage.js";

/* ----Seleccionamos los elementos del DOM---- */
const inputImagen = document.getElementById("imagen-perfil");
const btnCambiarFoto = document.getElementById("btn-cambiar-foto");
const estadoSuscripcion = document.querySelector(".estado-suscripcion");

/* ----Funciones del programa---- */

// Abre el selector de archivos
function abrir_selector_imagen() {
  if (inputImagen) inputImagen.click();
}

// Actualiza la imagen del perfil
function actualizar_foto_perfil() {
  const usuario = obtener_usuario_actual();
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  const archivo = inputImagen.files[0];
  if (!archivo) return;

  const tiposPermitidos = ["image/png", "image/jpeg", "image/webp"];
  if (!tiposPermitidos.includes(archivo.type)) {
    alert("Imagen no valida. Usa PNG, JPG o WEBP.");
    inputImagen.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const nuevaImagen = reader.result;

    const sesion = obtener_sesion();
    const usuarios = obtener_usuarios();
    usuarios[sesion.login].imagen = nuevaImagen;

    guardar_usuarios(usuarios);

    // Repintamos solo la imagen
    establecer_imagen_usuario(nuevaImagen);
    alert("Foto actualizada.");
  };

  reader.readAsDataURL(archivo);
}

/* ----Acciones del programa---- */
document.addEventListener("DOMContentLoaded", function () {
  const usuario = obtener_usuario_actual();
  if (!usuario) {
    window.location.href = "index.html";
    return;
  }

  establecer_nombre_usuario(usuario.login);
  establecer_correo_usuario(usuario.correo);
  establecer_imagen_usuario(usuario.imagen);

  /*Suscripcion pasa a activa si el usuario se suscribe*/
  if (estadoSuscripcion && tiene_suscripcion()) {
    estadoSuscripcion.textContent = "Suscripcion activa";
    estadoSuscripcion.style.color = "#e6b800"; 
    estadoSuscripcion.style.fontWeight = "700";
  }

  if (btnCambiarFoto) {
    btnCambiarFoto.addEventListener("click", abrir_selector_imagen);
  }

  if (inputImagen) {
    inputImagen.addEventListener("change", actualizar_foto_perfil);
  }
});
