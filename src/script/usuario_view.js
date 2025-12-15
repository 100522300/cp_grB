"use strict";

/* ----Seleccionamos los elementos del DOM---- */
const fotoUsuario = document.querySelector(".imagen-perfil-usuario");
const nombreUsuario = document.getElementById("texto-usuario");
const fotoPerfil = document.querySelector(".perfil-foto");
const nombrePerfil = document.getElementById("perfil-nombre");
const correoPerfil = document.getElementById("perfil-correo");

/* ----Funciones de vista del usuario---- */

// Establece todos los datos basicos del usuario
export function establecer_usuario(usuario) {
  if (!usuario) return;
  establecer_nombre_usuario(usuario.login);
  establecer_imagen_usuario(usuario.imagen);
}

// Establece el nombre de usuario
export function establecer_nombre_usuario(login) {
  if (nombreUsuario) {
    nombreUsuario.textContent = login;
  }

  if (nombrePerfil) {
    nombrePerfil.textContent = login;
  }
}

// Establece la imagen del usuario
export function establecer_imagen_usuario(imagen) {
  if (fotoUsuario && imagen) {
    fotoUsuario.src = imagen;
  }

  if (fotoPerfil && imagen) {
    fotoPerfil.style.backgroundImage = "url(" + imagen + ")";
    fotoPerfil.style.backgroundSize = "cover";
    fotoPerfil.style.backgroundPosition = "center";
    fotoPerfil.style.backgroundRepeat = "no-repeat";
  }
}

// Establece el correo del usuario en el perfil
export function establecer_correo_usuario(correo) {
  if (correoPerfil) {
    correoPerfil.textContent = correo;
  }
}
