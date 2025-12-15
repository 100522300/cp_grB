"use strict";

(function () {
    const sesion = localStorage.getItem("sesion");
    if (!sesion) {
        // Si no hay sesión, redirigir al index (landing page pública)
        window.location.href = "index.html";
    }
})();
