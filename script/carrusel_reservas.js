/* Script sencillo para el carrusel de reservas en el perfil */

document.addEventListener("DOMContentLoaded", function () {
    /* Variables para Mis Reservas */
    var contenedor_reservas = document.getElementById("contenedor-mis-reservas");
    var btn_izq_reservas = document.getElementById("btn-anterior-reservas");
    var btn_der_reservas = document.getElementById("btn-siguiente-reservas");

    /* Funcion para mover el carrusel la cantidad de pixeles que digamos */
    function moverCarrusel(contenedor, cantidad) {
        if (contenedor) {
            contenedor.scrollLeft += cantidad;
        }
    }

    /* Eventos click para Mis Reservas */
    if (btn_izq_reservas) {
        btn_izq_reservas.addEventListener("click", function () {
            /* Mover a la izquierda restar pixels */
            moverCarrusel(contenedor_reservas, -320);
        });
    }

    if (btn_der_reservas) {
        btn_der_reservas.addEventListener("click", function () {
            /* Mover a la derecha sumar pixels */
            moverCarrusel(contenedor_reservas, 320);
        });
    }

});
