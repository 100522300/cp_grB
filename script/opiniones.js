document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.querySelector(".opiniones-usuarios");
  const textarea = document.getElementById("opinion-text");
  const btnEnviar = document.getElementById("enviar-opinion");
  const flechaIzq = document.getElementById("flechaIzquierdaEuropa");
  const flechaDer = document.getElementById("flechaDerechaEuropa");

  const visibles = 4; // Número de opiniones visibles
  let contador = 0;

  // Obtenemos el destino actual desde URL
  const params = new URLSearchParams(window.location.search);
  const destinoActual = params.get("destino") || "tokyo";

  const STORAGE_KEY = `opiniones-${destinoActual}`; // Key diferenciada por destino

  // Opiniones base por destino
  const opinionesBasePorDestino = {
    tokyo: [
      { nombre: "Jackie Chan", avatar: "images/avatar_default.png", texto: "Me encantó Tokyo, repetiría sin dudar" },
      { nombre: "Yao Ming", avatar: "images/avatar_default.png", texto: "Todo muy bien organizado, 10/10" },
      { nombre: "Mahatma Gandhi", avatar: "images/avatar_default.png", texto: "El hotel y el vuelo fueron perfectos" },
      { nombre: "Bruce Lee", avatar: "images/avatar_default.png", texto: "Muy buen servicio y atención" }
    ],
    madrid: [
      { nombre: "Rafael Nadal", avatar: "images/avatar_default.png", texto: "Madrid es preciosa, me encantó la comida y el arte" },
      { nombre: "Andrés Iniesta", avatar: "images/avatar_default.png", texto: "Muy buena organización y guías amables" },
      { nombre: "Fernando Alonso", avatar: "images/avatar_default.png", texto: "Hotel céntrico y cómodo" },
      { nombre: "Pau Gasol", avatar: "images/avatar_default.png", texto: "Excelente viaje, repetiría sin dudas" }
    ],
    paris: [
      { nombre: "Kylian Mbappé", avatar: "images/avatar_default.png", texto: "La Torre Eiffel es increíble, Paris me fascinó" },
      { nombre: "Zinedine Zidane", avatar: "images/avatar_default.png", texto: "Buen viaje, muy romántico" },
      { nombre: "Paul Pogba", avatar: "images/avatar_default.png", texto: "Repetiría sin dudas" },
      { nombre: "Thierry Henry", avatar: "images/avatar_default.png", texto: "Muy buena organización y guías amables" }
    ],
    londres: [
      { nombre: "David Beckham", avatar: "images/avatar_default.png", texto: "Londres tiene mucho que ofrecer, excelente viaje" },
      { nombre: "Alan Turing", avatar: "images/avatar_default.png", texto: "Disfruté los museos y los paseos por el Támesis" },
      { nombre: "Dua Lipa", avatar: "images/avatar_default.png", texto: "Hotel cómodo y céntrico" },
      { nombre: "Phil Collins", avatar: "images/avatar_default.png", texto: "Muy buen servicio y atención" }
    ],
    "nueva-york": [
      { nombre: "The Rock", avatar: "images/avatar_default.png", texto: "NYC es impresionante, me encantó Times Square y Central Park" },
      { nombre: "Taylor Swift", avatar: "images/avatar_default.png", texto: "Excelente viaje, repetiría sin dudas" },
      { nombre: "Mr Beast", avatar: "images/avatar_default.png", texto: "El hotel y las excursiones perfectas" },
      { nombre: "Al Pacino", avatar: "images/avatar_default.png", texto: "Todo muy bien organizado, 10/10" }
    ]
  };

  let opiniones = JSON.parse(localStorage.getItem(STORAGE_KEY)) || opinionesBasePorDestino[destinoActual] || [];

  function guardarOpiniones() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opiniones));
  }

  function renderOpiniones() {
    contenedor.innerHTML = "";
    opiniones.forEach((op, index) => {
      const card = document.createElement("article");
      card.className = "opinion-card";
      card.style.display = (index >= contador && index < contador + visibles) ? "block" : "none";
      card.innerHTML = `
        <div class="opinion-usuario">
          <img class="avatar" src="${op.avatar}" alt="Avatar de ${op.nombre}">
          <span class="nombre-usuario">${op.nombre}</span>
        </div>
        <p class="texto-opinion">${op.texto}</p>
      `;
      contenedor.appendChild(card);
    });
  }

  flechaDer.addEventListener("click", () => {
    if (contador + visibles < opiniones.length) {
      contador++;
      renderOpiniones();
    }
  });

  flechaIzq.addEventListener("click", () => {
    if (contador > 0) {
      contador--;
      renderOpiniones();
    }
  });

  btnEnviar.addEventListener("click", () => {
    const texto = textarea.value.trim();
    if (!texto) return;

    const sesion = JSON.parse(localStorage.getItem("sesion"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios"));
    const usuario = sesion?.login ? usuarios[sesion.login] : null;

    const nuevaOpinion = {
      nombre: usuario?.nombre || "Usuario anónimo",
      avatar: usuario?.imagen || "images/avatar_default.png",
      texto
    };

    opiniones.unshift(nuevaOpinion);
    guardarOpiniones();

    contador = 0; // Mostrar siempre las más recientes
    renderOpiniones();
    textarea.value = "";
  });

  renderOpiniones();
});
