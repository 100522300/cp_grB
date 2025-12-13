/* Logout con <dialog> bonito (nivel noob pero bien hecho)
   - Funciona si el botón tiene: [data-logout] o .CerrarSesion o #cerrar-sesion
   - Si el navegador no soporta showModal, hace fallback a confirm()
   - Desbloquea scroll al cerrar por Cancelar, ESC o cerrar el diálogo
*/

function lockScroll() {
  document.body.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "";
}

function safeJsonParse(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

function removeSession() {
  // clave real usada en tu proyecto
  localStorage.removeItem("sesion");
}

function initLogoutModal() {
  var triggers = document.querySelectorAll("[data-logout], .CerrarSesion, #cerrar-sesion");
  if (!triggers.length) return;

  var dialog = document.getElementById("cerrar-sesion-ventana");
  var btnConfirm = document.getElementById("cerrar-confirm");
  var btnCancel = document.getElementById("cerrar-cancel");

  var canUseDialog = !!(dialog && typeof dialog.showModal === "function");

  function doLogout() {
    removeSession();
    // por si acaso
    closeDialog();
    window.location.href = "index.html";
  }

  function openDialog(e) {
    if (e) e.preventDefault();

    // fallback si no hay <dialog> o faltan botones
    if (!canUseDialog || !btnConfirm || !btnCancel) {
      var ok = window.confirm("¿Quieres cerrar sesión?");
      if (ok) doLogout();
      return;
    }

    dialog.showModal();
    lockScroll();
  }

  function closeDialog() {
    if (canUseDialog && dialog.open) dialog.close();
    unlockScroll();
  }

  triggers.forEach(function (el) {
    el.addEventListener("click", openDialog);
  });

  if (btnCancel) {
    btnCancel.addEventListener("click", function () {
      closeDialog();
    });
  }

  if (btnConfirm) {
    btnConfirm.addEventListener("click", function () {
      doLogout();
    });
  }

  if (canUseDialog) {
    // Si se cierra por ESC o por cualquier cierre externo
    dialog.addEventListener("close", function () {
      unlockScroll();
    });

    // Evita que ESC “cancele” raro y te deje el scroll bloqueado
    dialog.addEventListener("cancel", function (e) {
      e.preventDefault();
      closeDialog();
    });

    // Cerrar al clicar fuera del cuadro (backdrop)
    dialog.addEventListener("click", function (e) {
      var rect = dialog.getBoundingClientRect();
      var clickedOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

      if (clickedOutside) closeDialog();
    });
  }
}

document.addEventListener("DOMContentLoaded", initLogoutModal);
