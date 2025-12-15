/* newsletter simple con localStorage */

var clave_sesion = "sesion";
var clave_usuarios = "usuarios";
var prefijo_newsletter = "newsletter_";

function leer_json(clave) {
  /* leo un json del localStorage */
  var texto = localStorage.getItem(clave);
  if (!texto) return null;

  try {
    return JSON.parse(texto);
  } catch (e) {
    return null;
  }
}

function guardar_json(clave, obj) {
  /* guardo un json en localStorage */
  localStorage.setItem(clave, JSON.stringify(obj));
}

function sacar_login() {
  /* saco el login de la sesion */
  var sesion = leer_json(clave_sesion);
  if (!sesion) return null;
  return sesion.login || null;
}

function sacar_correo_del_usuario(login) {
  /* saco el correo real del usuario desde "usuarios" */
  if (!login) return null;

  var usuarios = leer_json(clave_usuarios);
  if (!usuarios) return null;

  var usuario = usuarios[login];
  if (!usuario) return null;

  if (usuario.correo) return String(usuario.correo).trim();
  if (usuario.email) return String(usuario.email).trim();

  return null;
}

function leer_suscripcion(login) {
  /* leo la suscripcion guardada */
  if (!login) return null;
  return leer_json(prefijo_newsletter + login);
}

function guardar_suscripcion(login, correo) {
  /* guardo la suscripcion activa */
  if (!login) return;
  guardar_json(prefijo_newsletter + login, { activa: true, correo: correo });
}

function borrar_suscripcion(login) {
  /* borro la suscripcion */
  if (!login) return;
  localStorage.removeItem(prefijo_newsletter + login);
}

function abrir_modal_newsletter(modal) {
  /* muestro modal de newsletter (div overlay) */
  if (!modal) return;
  modal.classList.add("modal-visible");
  modal.style.display = "flex";
}

function cerrar_modal_newsletter(modal) {
  /* oculto modal de newsletter (div overlay) */
  if (!modal) return;
  modal.classList.remove("modal-visible");
  modal.style.display = "none";
}

function activar_pagina_newsletter() {
  /* logica de la pagina newsletter */
  var form = document.querySelector(".form-newsletter");
  if (!form) return;

  var login = sacar_login();
  if (!login) {
    alert("Tienes que iniciar sesión para suscribirte.");
    window.location.href = "formulario_sesion.html";
    return;
  }

  var correo_usuario = sacar_correo_del_usuario(login);
  var input_correo = document.getElementById("correo");
  var check_politica = document.getElementById("aceptar-politica");

  var modal = document.querySelector(".modal-newsletter");
  var btn_cerrar = document.querySelector(".btn-cerrar-newsletter");

  /* dejo el modal bien oculto al cargar */
  if (modal) {
    cerrar_modal_newsletter(modal);
  }

  /* pongo el correo del usuario */
  if (input_correo && correo_usuario) {
    input_correo.value = correo_usuario;
  }

  /* cierro modal con el boton */
  if (btn_cerrar && modal) {
    btn_cerrar.addEventListener("click", function () {
      cerrar_modal_newsletter(modal);
    });
  }

  /* cierro modal si pincho fuera */
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) cerrar_modal_newsletter(modal);
    });
  }

  form.addEventListener("submit", function (e) {
    /* paro el submit para que no recargue */
    e.preventDefault();

    if (!input_correo) {
      alert("No encuentro el campo de correo.");
      return;
    }

    var correo = input_correo.value.trim();

    /* validacion simple de correo */
    var parece_correo = /^\S+@\S+\.\S+$/.test(correo);
    if (!parece_correo) {
      alert("Escribe un correo válido.");
      return;
    }

    if (!check_politica || !check_politica.checked) {
      alert("Debes aceptar la política de privacidad.");
      return;
    }

    /* obligo a usar el correo del perfil */
    if (correo_usuario && correo.toLowerCase() !== correo_usuario.toLowerCase()) {
      alert("Tienes que usar el correo de tu perfil: " + correo_usuario);
      return;
    }

    /* guardo suscripcion */
    guardar_suscripcion(login, correo);

    /* muestro modal */
    if (modal) {
      abrir_modal_newsletter(modal);
    } else {
      alert("Suscripción activa.");
    }
  });
}

function activar_pagina_perfil() {
  /* logica del perfil (estado + gestionar) */
  var estado = document.querySelector(".estado-suscripcion");
  var boton_gestionar = document.getElementById("btn-gestionar-newsletter");

  var ventana = document.getElementById("newsletter-ventana");
  var btn_cancelar = document.getElementById("newsletter-cancel");
  var btn_confirmar = document.getElementById("newsletter-confirm");

  if (!estado && !boton_gestionar && !ventana) return;

  var login = sacar_login();

  /* si no hay sesion */
  if (!login) {
    if (estado) estado.textContent = "Suscripción a newsletter inactiva";
    if (boton_gestionar) boton_gestionar.classList.add("oculto");
    return;
  }

  var sus = leer_suscripcion(login);

  /* pinto estado */
  if (sus && sus.activa) {
    if (estado) estado.textContent = "Suscripción a newsletter activa";
    if (boton_gestionar) boton_gestionar.classList.remove("oculto");
  } else {
    if (estado) estado.textContent = "Suscripción a newsletter inactiva";
    if (boton_gestionar) boton_gestionar.classList.add("oculto");
  }

  /* abrir dialog */
  if (boton_gestionar && ventana) {
    boton_gestionar.addEventListener("click", function () {
      if (ventana.showModal) {
        ventana.showModal();
      } else {
        ventana.style.display = "block";
      }
    });
  }

  /* cancelar */
  if (btn_cancelar && ventana) {
    btn_cancelar.addEventListener("click", function () {
      if (ventana.close) {
        ventana.close();
      } else {
        ventana.style.display = "none";
      }
    });
  }

  /* confirmar baja */
  if (btn_confirmar && ventana) {
    btn_confirmar.addEventListener("click", function () {
      borrar_suscripcion(login);

      if (estado) estado.textContent = "Suscripción a newsletter inactiva";
      if (boton_gestionar) boton_gestionar.classList.add("oculto");

      if (ventana.close) {
        ventana.close();
      } else {
        ventana.style.display = "none";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  /* arranque */
  activar_pagina_newsletter();
  activar_pagina_perfil();
});
