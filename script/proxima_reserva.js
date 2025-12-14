/* Script para mostrar la cuenta atrás de la próxima reserva
   Hecho sencillo y en español */

document.addEventListener("DOMContentLoaded", function () {
    /* 1. Buscamos el bloque donde vamos a escribir */
    var bloque_reserva = document.getElementById("bloque-reserva");
    var texto_reserva = document.getElementById("texto-reserva");

    if (!bloque_reserva || !texto_reserva) {
        return;
    }

    /* 2. Comprobamos si hay usuario logueado */
    var sesion_txt = localStorage.getItem("sesion");

    if (!sesion_txt) {
        texto_reserva.innerHTML = 'Inicia sesión para ver tu cuenta atrás. <a href="formulario_sesion.html">Ir al login</a>';
        return;
    }

    /* Parseamos la sesión con cuidado */
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

    /* 3. Buscamos TODAS las reservas del usuario para encontrar la más cercana */
    var usuarios_txt = localStorage.getItem("usuarios");
    var usuarios = {};
    if (usuarios_txt) {
        try {
            usuarios = JSON.parse(usuarios_txt);
        } catch (e) { }
    }

    var usuario_actual = usuarios[sesion.login]; // Cogemos el usuario por su login

    /* Si no tiene reservas o la lista está vacía */
    if (!usuario_actual || !usuario_actual.reservas || usuario_actual.reservas.length === 0) {
        texto_reserva.innerHTML = "Aún no tienes próxima reserva.";
        return;
    }

    /* Vamos a buscar la fecha más cercana al futuro */
    var reservas = usuario_actual.reservas;
    var ahora = new Date();
    var fecha_mas_cercana = null;
    var diferencia_minima = 999999999999999; /* Un numero muy grande inicial */

    for (var i = 0; i < reservas.length; i++) {
        var reserva = reservas[i];
        /* La fecha está guardada como string YYYY-MM-DD en reserva.salida */
        var fecha_salida = new Date(reserva.salida);

        /* Calculamos la diferencia con el momento actual */
        var diferencia = fecha_salida - ahora;

        /* Si la fecha es en el futuro (diferencia > 0) y es más pequeña que la que teníamos */
        if (diferencia > 0 && diferencia < diferencia_minima) {
            diferencia_minima = diferencia;
            fecha_mas_cercana = fecha_salida;
        }
    }

    if (!fecha_mas_cercana) {
        /* Significa que todas las reservas son del pasado */
        texto_reserva.innerHTML = "No tienes próximas reservas (todas ya pasaron).";
        return;
    }

    /* 4. Calculamos y mostramos el contador con la fecha elegida */
    var intervalo = setInterval(function () {
        var fecha_actual = new Date();
        var diferencia = fecha_mas_cercana - fecha_actual; /* Milisegundos */

        if (diferencia <= 0) {
            /* Ya ha pasado la fecha */
            texto_reserva.innerHTML = "¡Tu reserva ya está en marcha!";
            clearInterval(intervalo);
        } else {
            /* Calculamos días, horas, minutos, segundos */
            /* 1 segundo = 1000 ms */
            var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            var horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            var segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            /* Escribimos en la pantalla */
            texto_reserva.innerHTML = "Tu próxima reserva empieza en: <br>" +
                dias + "d " + horas + "h " + minutos + "m " + segundos + "s";
        }

    }, 1000); /* Se actualiza cada segundo */

});
