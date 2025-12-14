/* Script para mostrar la cuenta atrás de la próxima reserva
   Hecho sencillo y en español */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Buscamos el bloque donde vamos a escribir
    var bloque_reserva = document.getElementById("bloque-reserva");
    var texto_reserva = document.getElementById("texto-reserva");

    if (!bloque_reserva || !texto_reserva) {
        // Si no existen los elementos en el HTML, no hacemos nada
        return;
    }

    // 2. Comprobamos si hay usuario logueado
    var sesion_txt = localStorage.getItem("sesion");

    if (!sesion_txt) {
        // No hay sesión
        texto_reserva.innerHTML = 'Inicia sesión para ver tu cuenta atrás. <a href="formulario_sesion.html">Ir al login</a>';
        return;
    }

    // Parseamos la sesión con cuidado
    var sesion = null;
    try {
        sesion = JSON.parse(sesion_txt);
    } catch (e) {
        console.log("Error al leer sesión");
    }

    if (!sesion || !sesion.login) {
        texto_reserva.innerHTML = 'Inicia sesión para ver tu cuenta atrás. <a href="formulario_sesion.html">Ir al login</a>';
        return;
    }

    // 3. Buscamos la fecha guardada del usuario
    var login = sesion.login;
    var clave_fecha = "proxima_reserva_" + login;
    var fecha_guardada = localStorage.getItem(clave_fecha);

    if (!fecha_guardada) {
        // El usuario está logueado pero no ha comprado nada
        texto_reserva.innerHTML = "Aún no tienes próxima reserva.";
        return;
    }

    // 4. Calculamos y mostramos el contador
    // Convertimos el string guardado a fecha objeto
    var fecha_objetivo = new Date(fecha_guardada);

    // Función que se repite cada segundo
    var intervalo = setInterval(function () {
        var ahora = new Date();
        var diferencia = fecha_objetivo - ahora; // Esto da milisegundos

        if (diferencia <= 0) {
            // Ya ha pasado la fecha
            texto_reserva.innerHTML = "¡Tu reserva ya está en marcha!";
            clearInterval(intervalo); // Paramos el contador
        } else {
            // Calculamos días, horas, minutos, segundos
            // 1 segundo = 1000 ms
            // 1 minuto = 60 * 1000 ms
            // 1 hora = 60 * 60 * 1000 ms
            // 1 día = 24 * 60 * 60 * 1000 ms

            var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            // Escribimos en la pantalla
            texto_reserva.innerHTML = "Tu próxima reserva empieza en: <br>" +
                dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
        }

    }, 1000); // 1000 milisegundos = 1 segundo

});
