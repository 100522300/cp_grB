/* Para el desplegable de la fecha bonito utilizamos una herramienta externa (flatpickr)*/
document.addEventListener("DOMContentLoaded", () => {
  flatpickr("#fecha", {
    dateFormat: "d/m/Y",
    locale: "es",
    minDate: "today",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const inputDestino = document.getElementById("destino");
  const inputFecha = document.getElementById("fecha");
  const selectViajeros = document.getElementById("viajeros");
  const btnBuscar = document.querySelector(".busqueda-lupa");

  btnBuscar.addEventListener("click", (e) => {
    e.preventDefault();

    const destinoTexto = inputDestino.value.trim().toLowerCase();
    const fechaValor = inputFecha.value.trim();
    const viajerosValor = selectViajeros.value;

    const destinosMap = {
      tokyo: "tokyo",
      madrid: "madrid",
      parís: "paris",
      paris: "paris",
      londres: "londres",
      "nueva york": "nueva-york",
      "new york": "nueva-york",
    };

    // Validación de campos
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

    if (!viajerosValor) {
      alert("Selecciona la cantidad de viajeros");
      selectViajeros.focus();
      return;
    }

    // Comprobar sesión
    const usuarioLogueado = localStorage.getItem("usuarioLogueado");

    const destinoFinal = destinosMap[destinoTexto];

    if (!usuarioLogueado) {
      // Usuario no logueado, redirigimos a login
      window.location.href = `formulario_sesion.html?destino=${destinoFinal}&fecha=${fechaValor}&viajeros=${viajerosValor}`;
    } else {
      // Usuario logueado, redirige a resultados directamente
      window.location.href = `resultados.html?destino=${destinoFinal}&fecha=${fechaValor}&viajeros=${viajerosValor}`;
    }
  });
});
