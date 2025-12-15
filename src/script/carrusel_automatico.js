"use strict";

let contadorImagen = 0;
let carruselAutomaticoImagen;

const imagenesViajar = [
    "images/paisaje_hustle.jpeg",
    "images/paisaje-impresionante-1.jpeg",
    "images/paisaje-impresionante-2.jpeg",
    "images/paisaje-impresionante-3.jpeg",
    "images/paisaje-impresionante-4.jpeg",
    "images/paisaje-impresionante-5.jpg",
    "images/paisaje-impresionante-6.jpg",
    "images/paisaje-impresionante-7.jpeg"
];

// Inicializar al cargar la página
window.addEventListener("DOMContentLoaded", iniciarCarruselImagen);

function iniciarCarruselImagen() {
    ElegirImagen(); // muestra la primera

    carruselAutomaticoImagen = setInterval(() => {
        moverDerechaImagen();
    }, 3500); 
}

function ElegirImagen() {
    const div = document.querySelector(".imagen-viajar-esta-vez");
    if (!div) return;

    // Animación de fade out
    div.style.opacity = 0;

    setTimeout(() => {
        div.style.backgroundImage = `url("${imagenesViajar[contadorImagen]}")`;
        // Fade in
        div.style.opacity = 1;
    }, 900); // la mitad del tiempo de la transición para suavizar
}

function moverDerechaImagen() {
    contadorImagen = (contadorImagen + 1) % imagenesViajar.length;
    ElegirImagen();
}
