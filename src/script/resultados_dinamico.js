document.addEventListener("DOMContentLoaded", function () {
    /* 1. Leer parámetro URL */
    const params = new URLSearchParams(window.location.search);
    const destinoParam = params.get("destino"); // e.g. "paris"

    if (!destinoParam) return; // Si no hay destino, dejamos el HTML por defecto (Tokyo)

    /* 2. Base de datos de destinos (simple) */
    /* Debe coincidir con las claves usadas en busqueda.js */
    const destinos = {
        "tokyo": {
            titulo: "Tokyo",
            img: "images/tokyo.jpg",
            descripcion: "Vuelo y hotel incluidos para la ciudad más avanzada del mundo.",
            precio: 2150
        },
        "madrid": {
            titulo: "Madrid",
            img: "images/madrid.jpg",
            descripcion: "Disfruta de la capital española, su arte y su gastronomía.",
            precio: 450
        },
        "paris": {
            titulo: "París",
            img: "images/paris.jpg",
            descripcion: "La ciudad del amor, la Torre Eiffel y paseos inolvidables.",
            precio: 650
        },
        "londres": {
            titulo: "Londres",
            img: "images/londres.jpg",
            descripcion: "Historia, cultura y modernidad a orillas del Támesis.",
            precio: 720
        },
        "nueva-york": {
            titulo: "Nueva York",
            img: "images/nueva_york.jpg",
            descripcion: "La ciudad que nunca duerme te espera con sus rascacielos.",
            precio: 1200
        }
    };

    const info = destinos[destinoParam];
    if (!info) return; // Si no existe, dejamos el defecto

    /* 3. Actualizar DOM */

    // Imagen
    const imgElement = document.querySelector(".imagen-favoritos img");
    if (imgElement) {
        imgElement.src = info.img;
        imgElement.alt = "Imagen de " + info.titulo;
    }

    // Texto
    const container = document.querySelector(".informacion-busqueda");
    if (container) {
        const h3 = container.querySelector("h3");
        if (h3) h3.textContent = info.titulo;

        const pDesc = container.querySelector(".informacion-destino");
        if (pDesc) pDesc.textContent = info.descripcion;

        const pPrecio = container.querySelector(".js-price");
        if (pPrecio) {
            pPrecio.dataset.eur = info.precio;
            // Forzar actualización de moneda
            const currencySelect = document.getElementById("currency-select");
            if (currencySelect) currencySelect.dispatchEvent(new Event("change"));
        }
    }

    // Botón Favoritos
    const btnFav = document.querySelector(".añadir-a-favoritos");
    if (btnFav) {
        btnFav.dataset.favId = destinoParam; // "paris"
        btnFav.dataset.favTitle = info.titulo; // "París"
        // Construimos la URL para volver aquí mismo
        const currentUrl = window.location.href;
        // O mejor, construimos una limpia:
        btnFav.dataset.favUrl = "resultados.html?destino=" + destinoParam;

        // Resetear estado visual del botón por si acaso (aunque favorites.js lo hará después)
        btnFav.classList.remove("is-fav");
        btnFav.textContent = "⭐ Añadir a favoritos";
        btnFav.setAttribute("aria-pressed", "false");
    }

    // Botón Comprar Principal
    const btnComprar = document.querySelector(".informacion-busqueda .comprar");
    if (btnComprar) {
        btnComprar.onclick = function () {
            window.location.href = `compra.html?destino=${encodeURIComponent(info.titulo)}&precio=${info.precio}`;
        };
    }

    // Actualizar "Más resultados"
    const cards = document.querySelectorAll(".resultado-card");
    cards.forEach(card => {
        // Actualizar título a la ciudad actual
        const h3 = card.querySelector("h3");
        if (h3) h3.textContent = info.titulo;

        // Actualizar botón de comprar
        const btn = card.querySelector(".comprar-mas-resultados");
        const priceSpan = card.querySelector(".js-price");
        let price = 0;
        if (priceSpan && priceSpan.dataset.eur) {
            price = priceSpan.dataset.eur;
        }

        if (btn) {
            // Sobrescribimos el onclick inline
            btn.onclick = function () {
                window.location.href = `compra.html?destino=${encodeURIComponent(info.titulo)}&precio=${price}`;
            };
        }
    });

    /* Nota: favorites.js se ejecuta también en DOMContentLoaded.
       Si se ejecutan en orden, busqueda_dinamico debería ir ANTES de favorites 
       para que favorites.js lea los nuevos data-attributes. 
       Lo gestionaremos en el HTML. */
});
