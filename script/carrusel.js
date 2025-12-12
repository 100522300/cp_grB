let contadorEuropa=0;
let contadorAsia=0;
let contadorAfrica=0;
let contadorOceania=0;
let contadorAmericaDelNorte=0;
let contadorAmericaDelSur=0;
let carruselAutomatico;

window.addEventListener("DOMContentLoaded", iniciarCarrusel);


/* Función para iniciar el carrusel */
function iniciarCarrusel() {
    ElegirViajeEuropa();
    ElegirViajeAsia();
    ElegirViajeAfrica();
    ElegirViajeOceania();
    ElegirViajeAmericaDelNorte();
    ElegirViajeAmericaDelSur();

    /* Iniciamos el carrusel automático */
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);

    /* Llamamos a distintas funciones en función del botón pulsado para Europa */
    document.getElementById("flechaIzquierdaEuropa").addEventListener("click", moverIzquierdaEuropa);
    document.getElementById("flechaDerechaEuropa").addEventListener("click", moverDerechaEuropa);

    /* Llamamos a distintas funciones en función del botón pulsado para Asia */
    document.getElementById("flechaIzquierdaAsia").addEventListener("click", moverIzquierdaAsia);
    document.getElementById("flechaDerechaAsia").addEventListener("click", moverDerechaAsia);

    /* Llamamos a distintas funciones en función del botón pulsado para África */
    document.getElementById("flechaIzquierdaAfrica").addEventListener("click", moverIzquierdaAfrica);
    document.getElementById("flechaDerechaAfrica").addEventListener("click", moverDerechaAfrica);

    /* Llamamos a distintas funciones en función del botón pulsado para Oceanía */
    document.getElementById("flechaIzquierdaOceania").addEventListener("click", moverIzquierdaOceania);
    document.getElementById("flechaDerechaOceania").addEventListener("click", moverDerechaOceania);

    /* Llamamos a distintas funciones en función del botón pulsado para América Del Norte */
    document.getElementById("flechaIzquierdaAmericaDelNorte").addEventListener("click", moverIzquierdaAmericaDelNorte);
    document.getElementById("flechaDerechaAmericaDelNorte").addEventListener("click", moverDerechaAmericaDelNorte);

    /* Llamamos a distintas funciones en función del botón pulsado para América Del Sur */
    document.getElementById("flechaIzquierdaAmericaDelSur").addEventListener("click", moverIzquierdaAmericaDelSur);
    document.getElementById("flechaDerechaAmericaDelSur").addEventListener("click", moverDerechaAmericaDelSur);
}



/* --- LÓGICA DEL CARRUSEL DE EUROPA --- */

/* Función para mostrar el pack correspondiente en Europa */
function ElegirViajeEuropa() {
    /* Ocultamos todos los packs */
    document.getElementById("Viena").style.display = "none";
    document.getElementById("Brujas").style.display = "none";
    document.getElementById("Copenhague").style.display = "none";
    document.getElementById("Liubliana").style.display = "none";
    document.getElementById("Barcelona").style.display = "none";
    document.getElementById("Sevilla").style.display = "none";
    document.getElementById("Tallin").style.display = "none";
    document.getElementById("Paris").style.display = "none";
    document.getElementById("Budapest").style.display = "none";
    document.getElementById("Florencia").style.display = "none";
    document.getElementById("Roma").style.display = "none";
    document.getElementById("Venecia").style.display = "none";
    document.getElementById("LaValeta").style.display = "none";
    document.getElementById("Bergen").style.display = "none";
    document.getElementById("Amsterdam").style.display = "none";
    document.getElementById("Oporto").style.display = "none";
    document.getElementById("Londres").style.display = "none";
    document.getElementById("Edimburgo").style.display = "none";
    document.getElementById("Praga").style.display = "none";
    document.getElementById("Lucerna").style.display = "none";
    document.getElementById("Zurich").style.display = "none";
    document.getElementById("Reikiavik").style.display = "none";
    document.getElementById("Santorini").style.display = "none";
    document.getElementById("Monaco").style.display = "none";

    /* Mostramos el pack correspondiente */
    if (contadorEuropa === 0) {
        document.getElementById("Viena").style.display = "block";
        document.getElementById("Brujas").style.display = "block";
        document.getElementById("Copenhague").style.display = "block";;
    } else if (contadorEuropa === 1) {
        document.getElementById("Liubliana").style.display = "block";
        document.getElementById("Barcelona").style.display = "block";
        document.getElementById("Sevilla").style.display = "block";
    } else if (contadorEuropa === 2) {
        document.getElementById("Tallin").style.display = "block";
        document.getElementById("Paris").style.display = "block";
        document.getElementById("Budapest").style.display = "block";
    } else if (contadorEuropa === 3) {
        document.getElementById("Florencia").style.display = "block";
        document.getElementById("Roma").style.display = "block";
        document.getElementById("Venecia").style.display = "block";
    } else if (contadorEuropa === 4) {
        document.getElementById("LaValeta").style.display = "block";
        document.getElementById("Bergen").style.display = "block";
        document.getElementById("Amsterdam").style.display = "block";
    } else if (contadorEuropa === 5) {
        document.getElementById("Oporto").style.display = "block";
        document.getElementById("Londres").style.display = "block";
        document.getElementById("Edimburgo").style.display = "block";
    } else if (contadorEuropa === 6) {
        document.getElementById("Praga").style.display = "block";
        document.getElementById("Lucerna").style.display = "block";
        document.getElementById("Zurich").style.display = "block";
    } else if (contadorEuropa === 7) {
        document.getElementById("Reikiavik").style.display = "block";
        document.getElementById("Santorini").style.display = "block";
        document.getElementById("Monaco").style.display = "block";
    }
}


/* Función para mover el carrusel de Europa a la izquierda */
function moverIzquierdaEuropa() {
    contadorEuropa = (contadorEuropa - 1 + 8) % 8;    /* Contador mod8 para mover las imágenes de 3 en 3*/
    ElegirViajeEuropa();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}


/* Función para mover el carrusel de Europa a la derecha */
function moverDerechaEuropa() {
    contadorEuropa = (contadorEuropa + 1) % 8;    /* Contador mod8 para mover las imágenes de 3 en 3 */
    ElegirViajeEuropa();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}




/* --- LÓGICA DEL CARRUSEL DE ASIA --- */

/* Función para mostrar el pack correspondiente en Asia */
function ElegirViajeAsia() {
    /* Ocultamos todos los packs */
    document.getElementById("Beijing").style.display = "none";
    document.getElementById("HongKong").style.display = "none";
    document.getElementById("Seul").style.display = "none";
    document.getElementById("Jaipur").style.display = "none";
    document.getElementById("Kioto").style.display = "none";
    document.getElementById("LuangPrabang").style.display = "none";
    document.getElementById("Beirut").style.display = "none";
    document.getElementById("Mascate").style.display = "none";
    document.getElementById("Doha").style.display = "none";
    document.getElementById("ChiangMai").style.display = "none";
    document.getElementById("Hanoi").style.display = "none";
    document.getElementById("Singapur").style.display = "none";

    /* Mostramos el pack correspondiente */
    if (contadorAsia === 0) {
        document.getElementById("Beijing").style.display = "block";
        document.getElementById("HongKong").style.display = "block";
        document.getElementById("Seul").style.display = "block";
    } else if (contadorAsia === 1) {
        document.getElementById("Jaipur").style.display = "block";
        document.getElementById("Kioto").style.display = "block";
        document.getElementById("LuangPrabang").style.display = "block";
    } else if (contadorAsia === 2) {
        document.getElementById("Beirut").style.display = "block";
        document.getElementById("Mascate").style.display = "block";
        document.getElementById("Doha").style.display = "block";
    } else if (contadorAsia === 3) {
        document.getElementById("ChiangMai").style.display = "block";
        document.getElementById("Hanoi").style.display = "block";
        document.getElementById("Singapur").style.display = "block";
    } 
}


/* Función para mover el carrusel de Asia a la izquierda */
function moverIzquierdaAsia() {
    contadorAsia = (contadorAsia - 1 + 4) % 4;    /* Contador mod4 para mover las imágenes de 3 en 3 */
    ElegirViajeAsia();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}


/* Función para mover el carrusel de Asia a la derecha */
function moverDerechaAsia() {
    contadorAsia = (contadorAsia + 1) % 4;    /* Contador mod4 para mover las imágenes de 3 en 3*/
    ElegirViajeAsia();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}




/* --- LÓGICA DEL CARRUSEL DE ÁFRICA --- */

/* Función para mostrar el pack correspondiente en África */
function ElegirViajeAfrica() {
    /* Ocultamos todos los packs */
    document.getElementById("Chefchaouen").style.display = "none";
    document.getElementById("CiudadDelCabo").style.display = "none";
    document.getElementById("ElCairo").style.display = "none";
    document.getElementById("ElSerengueti").style.display = "none";
    document.getElementById("Zanzibar").style.display = "none";
    document.getElementById("Nairobi").style.display = "none";

    /* Mostramos el pack correspondiente */
    if (contadorAfrica === 0) {
        document.getElementById("Chefchaouen").style.display = "block";
        document.getElementById("CiudadDelCabo").style.display = "block";
        document.getElementById("ElCairo").style.display = "block";
    } else if (contadorAfrica === 1) {
        document.getElementById("ElSerengueti").style.display = "block";
        document.getElementById("Zanzibar").style.display = "block";
        document.getElementById("Nairobi").style.display = "block";
    }
}


/* Función para mover el carrusel de África a la izquierda */
function moverIzquierdaAfrica() {
    contadorAfrica = (contadorAfrica - 1 + 2) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3 */
    ElegirViajeAfrica();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}


/* Función para mover el carrusel de África a la derecha */
function moverDerechaAfrica() {
    contadorAfrica = (contadorAfrica + 1) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3*/
    ElegirViajeAfrica();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}




/* --- LÓGICA DEL CARRUSEL DE OCEANÍA --- */

/* Función para mostrar el pack correspondiente en Oceanía */
function ElegirViajeOceania() {
    /* Ocultamos todos los packs */
    document.getElementById("Sidney").style.display = "none";
    document.getElementById("Queenstown").style.display = "none";
    document.getElementById("TarawaSur").style.display = "none";
    document.getElementById("PortVila").style.display = "none";
    document.getElementById("Yaren").style.display = "none";
    document.getElementById("Samoia").style.display = "none";

    /* Mostramos el pack correspondiente */
    if (contadorOceania === 0) {
        document.getElementById("Sidney").style.display = "block";
        document.getElementById("Queenstown").style.display = "block";
        document.getElementById("TarawaSur").style.display = "block";
    } else if (contadorOceania === 1) {
        document.getElementById("PortVila").style.display = "block";
        document.getElementById("Yaren").style.display = "block";
        document.getElementById("Samoia").style.display = "block";
    }
}


/* Función para mover el carrusel de Oceanía a la izquierda */
function moverIzquierdaOceania() {
    contadorOceania = (contadorOceania - 1 + 2) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3*/
    ElegirViajeOceania();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}


/* Función para mover el carrusel de Oceanía a la derecha */
function moverDerechaOceania() {
    contadorOceania = (contadorOceania + 1) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3 */
    ElegirViajeOceania();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}




/* --- LÓGICA DEL CARRUSEL DE AMÉRICA DEL NORTE --- */

/* Función para mostrar el pack correspondiente en América Del Norte */
function ElegirViajeAmericaDelNorte() {
    /* Ocultamos todos los packs */
    document.getElementById("CiudadDeQuebec").style.display = "none";
    document.getElementById("LaHabana").style.display = "none";
    document.getElementById("SanMiguelDeAllende").style.display = "none";
    document.getElementById("NuevaYork").style.display = "none";
    document.getElementById("SanFrancisco").style.display = "none";
    document.getElementById("Chicago").style.display = "none";

    /* Mostramos el pack correspondiente */
    if (contadorAmericaDelNorte === 0) {
        document.getElementById("CiudadDeQuebec").style.display = "block";
        document.getElementById("LaHabana").style.display = "block";
        document.getElementById("SanMiguelDeAllende").style.display = "block";
    } else if (contadorAmericaDelNorte === 1) {
        document.getElementById("NuevaYork").style.display = "block";
        document.getElementById("SanFrancisco").style.display = "block";
        document.getElementById("Chicago").style.display = "block";
    }
}


/* Función para mover el carrusel de América Del Norte a la izquierda */
function moverIzquierdaAmericaDelNorte() {
    contadorAmericaDelNorte = (contadorAmericaDelNorte - 1 + 2) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3*/
    ElegirViajeAmericaDelNorte();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}


/* Función para mover el carrusel de América Del Norte a la derecha */
function moverDerechaAmericaDelNorte() {
    contadorAmericaDelNorte = (contadorAmericaDelNorte + 1) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3 */
    ElegirViajeAmericaDelNorte();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}




/* --- LÓGICA DEL CARRUSEL DE AMÉRICA DEL SUR --- */

/* Función para mostrar el pack correspondiente en América Del Sur */
function ElegirViajeAmericaDelSur() {
    /* Ocultamos todos los packs */
    document.getElementById("BuenosAires").style.display = "none";
    document.getElementById("RioDeJaneiro").style.display = "none";
    document.getElementById("Cartagena").style.display = "none";
    document.getElementById("Quito").style.display = "none";
    document.getElementById("Cuzco").style.display = "none";
    document.getElementById("Patagonia").style.display = "none";

    /* Mostramos el pack correspondiente */
    if (contadorAmericaDelSur === 0) {
        document.getElementById("BuenosAires").style.display = "block";
        document.getElementById("RioDeJaneiro").style.display = "block";
        document.getElementById("Cartagena").style.display = "block";
    } else if (contadorAmericaDelSur === 1) {
        document.getElementById("Quito").style.display = "block";
        document.getElementById("Cuzco").style.display = "block";
        document.getElementById("Patagonia").style.display = "block";
    }
}


/* Función para mover el carrusel de América Del Sur a la izquierda */
function moverIzquierdaAmericaDelSur() {
    contadorAmericaDelSur = (contadorAmericaDelSur - 1 + 2) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3*/
    ElegirViajeAmericaDelSur();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}


/* Función para mover el carrusel de América Del Sur a la derecha */
function moverDerechaAmericaDelSur() {
    contadorAmericaDelSur = (contadorAmericaDelSur + 1) % 2;    /* Contador mod2 para mover las imágenes de 3 en 3 */
    ElegirViajeAmericaDelSur();

    /* Reiniciamos el intervalo */
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 3500);
}