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
  const btnBuscar = document.querySelector(".busqueda-lupa");

  btnBuscar.addEventListener("click", () => {
    const destinoTexto = inputDestino.value.trim().toLowerCase();

    // Mapa texto → clave interna
    const destinosMap = {
      tokyo: "tokyo",
      madrid: "madrid",
      parís: "paris",
      paris: "paris",
      londres: "londres",
      "nueva york": "nueva-york",
      "new york": "nueva-york",
    };

    if (!destinosMap[destinoTexto]) {
      alert("Selecciona un destino válido");
      return;
    }

    const destinoFinal = destinosMap[destinoTexto];
    window.location.href = `resultados.html?destino=${destinoFinal}`;
  });
});
