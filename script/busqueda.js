/* Para el desplegable de la fecha bonito utilizamos una herramienta externa (flatpickr)*/
document.addEventListener("DOMContentLoaded", () => {
  flatpickr("#fecha", {
    dateFormat: "d/m/Y",
    locale: "es",
    minDate: "today",
  });
});
