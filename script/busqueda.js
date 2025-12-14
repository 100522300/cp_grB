/* Inicializar flatpickr */
document.addEventListener("DOMContentLoaded", () => {
  const inputFecha = document.getElementById("fecha");

  if (inputFecha) {
    flatpickr(inputFecha, {
      dateFormat: "d/m/Y",
      locale: "es",
      minDate: "today",
    });
  }

  const inputDestino = document.getElementById("destino");
  const btnBuscar = document.querySelector(".busqueda-lupa");

  // Si no existe el botón, no hacemos nada
  if (!btnBuscar) return;

  btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();

    // Seguridad: comprobar que existen los campos
    if (!inputDestino || !inputFecha) {
      console.error("Faltan campos del formulario de búsqueda");
      return;
    }

    const destinoTexto = inputDestino.value.trim().toLowerCase();
    const fechaValor = inputFecha.value.trim();

    const destinosMap = {
      tokyo: "tokyo",
      madrid: "madrid",
      parís: "paris",
      paris: "paris",
      londres: "londres",
      "nueva york": "nueva-york",
      "new york": "nueva-york",
    };

    // Validaciones
    if (!destinosMap[destinoTexto]) {
      alert("Selecciona un destino válido");
      inputDestino.focus();
      return;
    }

    if (!fechaValor) {
      alert("Selecciona una fecha de salida");
      inputFecha.focus();
      return;
    }



    const destinoFinal = destinosMap[destinoTexto];

    // Comprobación de sesión REAL
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    //const sesionActiva = localStorage.getItem("sesionActiva") === "true";

    const usuarioLogueado = sesion && sesion.login;
    //&& sesionActiva;

    if (!usuarioLogueado) {
      // NO logueado -> login
      window.location.href = `formulario_sesion.html?destino=${destinoFinal}&fecha=${fechaValor}`;
    } else {
      // Logueado -> resultados
      window.location.href = `resultados.html?destino=${destinoFinal}&fecha=${fechaValor}`;
    }
  });
});
