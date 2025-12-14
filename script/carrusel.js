"use strict";

let contadorEuropa=0;
let contadorAsia=0;
let contadorAfrica=0;
let contadorOceania=0;
let contadorAmericaDelNorte=0;
let contadorAmericaDelSur=0;
let carruselAutomatico;
let resizeTimer;
const LIMITE_UNO = 900;
const grupos = {
    Europa: ["Viena","Brujas","Copenhague","Liubliana","Barcelona","Sevilla","Tallin","Paris","Budapest","Florencia","Roma","Venecia","LaValeta","Bergen","Amsterdam","Oporto","Londres","Edimburgo","Praga","Lucerna","Zurich","Reikiavik","Santorini","Monaco"],
    Asia: ["Beijing","HongKong","Seul","Jaipur","Kioto","LuangPrabang","Beirut","Mascate","Doha","ChiangMai","Hanoi","Singapur"],
    Africa: ["Chefchaouen","CiudadDelCabo","ElCairo","ElSerengueti","Zanzibar","Nairobi"],
    Oceania: ["Sidney","Queenstown","TarawaSur","PortVila","Yaren","Samoia"],
    AmericaNorte: ["CiudadDeQuebec","LaHabana","SanMiguelDeAllende","NuevaYork","SanFrancisco","Chicago"],
    AmericaSur: ["BuenosAires","RioDeJaneiro","Cartagena","Quito","Cuzco","Patagonia"],
};

function limitarUno(ids) {
    if (window.innerWidth > LIMITE_UNO) return;
    let mostrado = 0;
    ids.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (el.style.display !== "none" && mostrado === 0) {
            mostrado = 1;
        } else {
            el.style.display = "none";
        }
    });
}

window.addEventListener("DOMContentLoaded", iniciarCarrusel);

function iniciarCarrusel() {
    ElegirViajeEuropa();
    ElegirViajeAsia();
    ElegirViajeAfrica();
    ElegirViajeOceania();
    ElegirViajeAmericaDelNorte();
    ElegirViajeAmericaDelSur();

    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);

    document.getElementById("flechaIzquierdaEuropa").addEventListener("click", moverIzquierdaEuropa);
    document.getElementById("flechaDerechaEuropa").addEventListener("click", moverDerechaEuropa);

    document.getElementById("flechaIzquierdaAsia").addEventListener("click", moverIzquierdaAsia);
    document.getElementById("flechaDerechaAsia").addEventListener("click", moverDerechaAsia);

    document.getElementById("flechaIzquierdaAfrica").addEventListener("click", moverIzquierdaAfrica);
    document.getElementById("flechaDerechaAfrica").addEventListener("click", moverDerechaAfrica);

    document.getElementById("flechaIzquierdaOceania").addEventListener("click", moverIzquierdaOceania);
    document.getElementById("flechaDerechaOceania").addEventListener("click", moverDerechaOceania);

    document.getElementById("flechaIzquierdaAmericaDelNorte").addEventListener("click", moverIzquierdaAmericaDelNorte);
    document.getElementById("flechaDerechaAmericaDelNorte").addEventListener("click", moverDerechaAmericaDelNorte);

    document.getElementById("flechaIzquierdaAmericaDelSur").addEventListener("click", moverIzquierdaAmericaDelSur);
    document.getElementById("flechaDerechaAmericaDelSur").addEventListener("click", moverDerechaAmericaDelSur);

    window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(recalcularCarruseles, 150);
    });
}

function ElegirViajeEuropa() {
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
    if (window.innerWidth <= LIMITE_UNO) limitarUno(grupos.Europa);
}

function moverIzquierdaEuropa() {
    contadorEuropa = (contadorEuropa - 1 + 8) % 8;
    ElegirViajeEuropa();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function moverDerechaEuropa() {
    contadorEuropa = (contadorEuropa + 1) % 8;
    ElegirViajeEuropa();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function ElegirViajeAsia() {
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
    if (window.innerWidth <= LIMITE_UNO) limitarUno(grupos.Asia);
}

function moverIzquierdaAsia() {
    contadorAsia = (contadorAsia - 1 + 4) % 4;
    ElegirViajeAsia();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function moverDerechaAsia() {
    contadorAsia = (contadorAsia + 1) % 4;
    ElegirViajeAsia();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function ElegirViajeAfrica() {
    document.getElementById("Chefchaouen").style.display = "none";
    document.getElementById("CiudadDelCabo").style.display = "none";
    document.getElementById("ElCairo").style.display = "none";
    document.getElementById("ElSerengueti").style.display = "none";
    document.getElementById("Zanzibar").style.display = "none";
    document.getElementById("Nairobi").style.display = "none";

    if (contadorAfrica === 0) {
        document.getElementById("Chefchaouen").style.display = "block";
        document.getElementById("CiudadDelCabo").style.display = "block";
        document.getElementById("ElCairo").style.display = "block";
    } else if (contadorAfrica === 1) {
        document.getElementById("ElSerengueti").style.display = "block";
        document.getElementById("Zanzibar").style.display = "block";
        document.getElementById("Nairobi").style.display = "block";
    }
    if (window.innerWidth <= LIMITE_UNO) limitarUno(grupos.Africa);
}

function moverIzquierdaAfrica() {
    contadorAfrica = (contadorAfrica - 1 + 2) % 2;
    ElegirViajeAfrica();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function moverDerechaAfrica() {
    contadorAfrica = (contadorAfrica + 1) % 2;
    ElegirViajeAfrica();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function ElegirViajeOceania() {
    document.getElementById("Sidney").style.display = "none";
    document.getElementById("Queenstown").style.display = "none";
    document.getElementById("TarawaSur").style.display = "none";
    document.getElementById("PortVila").style.display = "none";
    document.getElementById("Yaren").style.display = "none";
    document.getElementById("Samoia").style.display = "none";

    if (contadorOceania === 0) {
        document.getElementById("Sidney").style.display = "block";
        document.getElementById("Queenstown").style.display = "block";
        document.getElementById("TarawaSur").style.display = "block";
    } else if (contadorOceania === 1) {
        document.getElementById("PortVila").style.display = "block";
        document.getElementById("Yaren").style.display = "block";
        document.getElementById("Samoia").style.display = "block";
    }
    if (window.innerWidth <= LIMITE_UNO) limitarUno(grupos.Oceania);
}

function moverIzquierdaOceania() {
    contadorOceania = (contadorOceania - 1 + 2) % 2;
    ElegirViajeOceania();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function moverDerechaOceania() {
    contadorOceania = (contadorOceania + 1) % 2;
    ElegirViajeOceania();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function ElegirViajeAmericaDelNorte() {
    document.getElementById("CiudadDeQuebec").style.display = "none";
    document.getElementById("LaHabana").style.display = "none";
    document.getElementById("SanMiguelDeAllende").style.display = "none";
    document.getElementById("NuevaYork").style.display = "none";
    document.getElementById("SanFrancisco").style.display = "none";
    document.getElementById("Chicago").style.display = "none";

    if (contadorAmericaDelNorte === 0) {
        document.getElementById("CiudadDeQuebec").style.display = "block";
        document.getElementById("LaHabana").style.display = "block";
        document.getElementById("SanMiguelDeAllende").style.display = "block";
    } else if (contadorAmericaDelNorte === 1) {
        document.getElementById("NuevaYork").style.display = "block";
        document.getElementById("SanFrancisco").style.display = "block";
        document.getElementById("Chicago").style.display = "block";
    }
    if (window.innerWidth <= LIMITE_UNO) limitarUno(grupos.AmericaNorte);
}

function moverIzquierdaAmericaDelNorte() {
    contadorAmericaDelNorte = (contadorAmericaDelNorte - 1 + 2) % 2;
    ElegirViajeAmericaDelNorte();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function moverDerechaAmericaDelNorte() {
    contadorAmericaDelNorte = (contadorAmericaDelNorte + 1) % 2;
    ElegirViajeAmericaDelNorte();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function ElegirViajeAmericaDelSur() {
    document.getElementById("BuenosAires").style.display = "none";
    document.getElementById("RioDeJaneiro").style.display = "none";
    document.getElementById("Cartagena").style.display = "none";
    document.getElementById("Quito").style.display = "none";
    document.getElementById("Cuzco").style.display = "none";
    document.getElementById("Patagonia").style.display = "none";

    if (contadorAmericaDelSur === 0) {
        document.getElementById("BuenosAires").style.display = "block";
        document.getElementById("RioDeJaneiro").style.display = "block";
        document.getElementById("Cartagena").style.display = "block";
    } else if (contadorAmericaDelSur === 1) {
        document.getElementById("Quito").style.display = "block";
        document.getElementById("Cuzco").style.display = "block";
        document.getElementById("Patagonia").style.display = "block";
    }
    if (window.innerWidth <= LIMITE_UNO) limitarUno(grupos.AmericaSur);
}

function moverIzquierdaAmericaDelSur() {
    contadorAmericaDelSur = (contadorAmericaDelSur - 1 + 2) % 2;
    ElegirViajeAmericaDelSur();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function moverDerechaAmericaDelSur() {
    contadorAmericaDelSur = (contadorAmericaDelSur + 1) % 2;
    ElegirViajeAmericaDelSur();
    clearInterval(carruselAutomatico);
    carruselAutomatico = setInterval(() => {
        moverDerechaEuropa();
        moverDerechaAsia();
        moverDerechaAfrica();
        moverDerechaOceania();
        moverDerechaAmericaDelNorte();
        moverDerechaAmericaDelSur();
    }, 30000);
}

function recalcularCarruseles() {
    ElegirViajeEuropa();
    ElegirViajeAsia();
    ElegirViajeAfrica();
    ElegirViajeOceania();
    ElegirViajeAmericaDelNorte();
    ElegirViajeAmericaDelSur();
}