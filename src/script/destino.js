/* Los 5 destinos posibles del buscador*/

const DESTINOS = {
  tokyo: {
    nombre: "Tokyo",
    descripcion:
      "Vuelo y hotel incluidos para la ciudad más avanzada del mundo.",
    imagenPrincipal: "images/tokyo.jpg",
    precioPrincipal: 2150,
    favoritosId: "tokyo",
    masResultados: [
      {
        img: "images/imagen1busqueda.jpg",
        precio: 1850,
        tipo: "Hotel 7 noches",
      },
      {
        img: "images/imagen2busqueda.jpg",
        precio: 590,
        tipo: "Hotel más visita guiada",
      },
      {
        img: "images/imagen3busqueda.jpg",
        precio: 3400,
        tipo: "Hotel lujo + vuelo + tour",
      },
    ],
  },

  madrid: {
    nombre: "Madrid",
    descripcion: "Escapada cultural con hotel y visitas guiadas.",
    imagenPrincipal: "images/madrid.jpg",
    precioPrincipal: 950,
    favoritosId: "madrid",
    masResultados: [
      {
        img: "images/madrid1.jpg",
        precio: 650,
        tipo: "Hotel céntrico",
      },
      {
        img: "images/madrid2.jpg",
        precio: 1200,
        tipo: "Hotel + museos",
      },
      {
        img: "images/madrid3.jpg",
        precio: 1800,
        tipo: "Experiencia premium",
      },
    ],
  },

  paris: {
    nombre: "París",
    descripcion: "La ciudad del amor con vuelo y hotel incluidos.",
    imagenPrincipal: "images/paris.jpg",
    precioPrincipal: 1300,
    favoritosId: "paris",
    masResultados: [
      {
        img: "images/paris1.jpg",
        precio: 900,
        tipo: "Hotel romántico",
      },
      {
        img: "images/paris2.jpg",
        precio: 1500,
        tipo: "Hotel + tour",
      },
      {
        img: "images/paris3.jpg",
        precio: 2500,
        tipo: "Lujo + crucero Sena",
      },
    ],
  },

  londres: {
    nombre: "Londres",
    descripcion: "Descubre la capital británica con vuelo y hotel incluidos.",
    imagenPrincipal: "images/londres.jpg",
    precioPrincipal: 1400,
    favoritosId: "londres",
    masResultados: [
      {
        img: "images/londres1.jpg",
        precio: 850,
        tipo: "Hotel céntrico",
      },
      {
        img: "images/londres2.jpg",
        precio: 1600,
        tipo: "Hotel + tour histórico",
      },
      {
        img: "images/londres3.jpg",
        precio: 2700,
        tipo: "Experiencia premium",
      },
    ],
  },

  "nueva-york": {
    nombre: "Nueva York",
    descripcion: "Vive la ciudad que nunca duerme con vuelo y hotel incluidos.",
    imagenPrincipal: "images/nueva_york.jpg",
    precioPrincipal: 1900,
    favoritosId: "nueva-york",
    masResultados: [
      {
        img: "images/ny1.jpg",
        precio: 1300,
        tipo: "Hotel en Manhattan",
      },
      {
        img: "images/ny2.jpg",
        precio: 2200,
        tipo: "Hotel + city pass",
      },
      {
        img: "images/ny3.jpg",
        precio: 3500,
        tipo: "Lujo + espectáculo Broadway",
      },
    ],
  },
};

/* Elementos del DOM */
const titulo =
  document.querySelector(".informacion-busqueda h2") ||
  document.querySelector(".informacion-busqueda h3");
const descripcion = document.querySelector(".informacion-destino");
const imagenPrincipal = document.querySelector(".imagen-tokyo");
const precioPrincipal = document.querySelector(".precio .js-price");
const btnFavoritos = document.querySelector(".añadir-a-favoritos");
const masResultados = document.querySelectorAll(".resultado-card");

/* Funciones */
function getDestinoFromURL() {
  const params = new URLSearchParams(window.location.search);
  return (params.get("destino") || "tokyo").toLowerCase();
}

function cargarDestino(destinoKey) {
  const destino = DESTINOS[destinoKey];
  if (!destino) return;

  // T?tulo y texto
  if (titulo) titulo.textContent = destino.nombre;
  if (descripcion) descripcion.textContent = destino.descripcion;

  // Imagen principal
  if (imagenPrincipal) {
    imagenPrincipal.src = destino.imagenPrincipal;
    imagenPrincipal.alt = `Imagen de ${destino.nombre}`;
  }

  // Precio principal
  if (precioPrincipal) {
    precioPrincipal.dataset.eur = destino.precioPrincipal;
  }
  const currencySelect = document.getElementById("currency-select");
  if (currencySelect) {
    currencySelect.dispatchEvent(new Event("change"));
  }

  // Favoritos
  if (btnFavoritos) {
    btnFavoritos.dataset.favId = destino.favoritosId;
    btnFavoritos.dataset.favTitle = destino.nombre;
    btnFavoritos.dataset.favUrl = `resultados.html?destino=${encodeURIComponent(destinoKey)}`;
    btnFavoritos.classList.remove("is-fav");
    btnFavoritos.setAttribute("aria-pressed", "false");
  }

  // Bot?n principal comprar
  const btnComprarPrincipal = document.querySelector(
    ".informacion-busqueda .comprar"
  );
  if (btnComprarPrincipal) {
    btnComprarPrincipal.onclick = function () {
      window.location.href = `compra.html?destino=${encodeURIComponent(
        destino.nombre
      )}&precio=${destino.precioPrincipal}`;
    };
  }

  // M?s resultados
  destino.masResultados.forEach((res, index) => {
    const card = masResultados[index];
    if (!card) return;

    const tituloCard = card.querySelector("h3");
    if (tituloCard) tituloCard.textContent = destino.nombre;

    const imgCard = card.querySelector("img");
    if (imgCard) {
      imgCard.src = res.img;
      imgCard.alt = `Imagen de ${destino.nombre} ${index + 1}`;
    }

    const priceSpan = card.querySelector(".js-price");
    if (priceSpan) {
      priceSpan.dataset.eur = res.precio;
    }

    const tipoHotel = card.querySelector(".tipo-hotel");
    if (tipoHotel) tipoHotel.textContent = res.tipo;

    const btnCard = card.querySelector(".comprar-mas-resultados");
    if (btnCard) {
      btnCard.onclick = function () {
        window.location.href = `compra.html?destino=${encodeURIComponent(
          destino.nombre
        )}&precio=${res.precio}`;
      };
    }
  });
}
/* Eventos */
document.addEventListener("DOMContentLoaded", () => {
  const destino = getDestinoFromURL();
  cargarDestino(destino);
});
