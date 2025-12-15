// script/opiniones.js
document.addEventListener("DOMContentLoaded", () => {
  // --- Elementos del DOM ---
  const contenedor = document.getElementById("contenedor-opiniones") || document.querySelector(".opiniones-usuarios");
  const textarea = document.getElementById("opinion-text");
  const btnEnviar = document.getElementById("enviar-opinion");
  const flechaIzq = document.getElementById("flechaIzquierdaEuropa");
  const flechaDer = document.getElementById("flechaDerechaEuropa");
  const template = document.getElementById("opinion-template");

  // Si esta página no tiene el bloque de opiniones, salimos sin romper nada
  if (!contenedor || !textarea || !btnEnviar || !flechaIzq || !flechaDer) return;

  const VISIBLES = 4;
  let contador = 0;

  // --- Helpers ---
  function normalizeDestino(raw) {
    if (!raw) return "tokyo";

    let s = String(raw).trim().toLowerCase();

    // quitar tildes/diacríticos
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // espacios/underscores -> guiones
    s = s.replace(/[\s_]+/g, "-").replace(/-+/g, "-");

    // alias comunes
    const alias = {
      "tokio": "tokyo",
      "london": "londres",
      "newyork": "nueva-york",
      "new-york": "nueva-york",
      "nueva-york": "nueva-york",
      "nueva-york-city": "nueva-york",
      "nyc": "nueva-york",
      "new-york-city": "nueva-york",
      "nueva-york-city": "nueva-york",
    };

    if (alias[s]) return alias[s];
    return s;
  }

  function fixAvatarPath(path) {
    if (!path) return "images/avatar_default.png";

    // Si ya es dataURL o URL absoluta, lo dejamos
    if (/^(data:|https?:\/\/)/i.test(path)) return path;

    // Migración: si venía guardado como "../images/...", lo convertimos a "images/..."
    if (path.startsWith("../images/")) return path.replace("../images/", "images/");
    if (path.startsWith("./images/")) return path.replace("./images/", "images/");

    // Si empieza por "images/" ya está bien
    if (path.startsWith("images/")) return path;

    // Si por lo que sea guardaron solo el nombre de archivo:
    if (!path.includes("/")) return `images/${path}`;

    // En cualquier otro caso lo devolvemos tal cual (por si usas carpetas distintas)
    return path;
  }

  function setImgWithFallback(imgEl, src, alt) {
    imgEl.alt = alt || "Avatar";
    imgEl.src = fixAvatarPath(src);
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = "images/avatar_default.png";
    };
  }

  function updateArrows(total) {
    // Deshabilitar si no hay hacia dónde moverse
    flechaIzq.disabled = contador <= 0;
    flechaDer.disabled = contador + VISIBLES >= total;

    // (opcional) aria-disabled para accesibilidad
    flechaIzq.setAttribute("aria-disabled", String(flechaIzq.disabled));
    flechaDer.setAttribute("aria-disabled", String(flechaDer.disabled));
  }

  // --- Destino actual desde la URL ---
  const params = new URLSearchParams(window.location.search);
  const destinoActual = normalizeDestino(params.get("destino"));
  const STORAGE_KEY = `opiniones-${destinoActual}`;

  // --- Opiniones base por destino (rutas CORRECTAS: images/...) ---
  const opinionesBasePorDestino = {
    tokyo: [
      { nombre: "Jackie Chan", avatar: "images/jackie-chan.jpeg", texto: "Me encantó Tokyo, repetiría sin dudar" },
      { nombre: "Yao Ming", avatar: "images/yao-ming.png", texto: "Todo muy bien organizado, 10/10" },
      { nombre: "Mahatma Gandhi", avatar: "images/mahatma-gandhi.jpg", texto: "El hotel y el vuelo fueron perfectos" },
      { nombre: "Bruce Lee", avatar: "images/bruce-lee.jpg", texto: "Muy buen servicio y atención" }
    ],
    madrid: [
      { nombre: "Rafael Nadal", avatar: "images/rafa-nadal.png", texto: "Madrid es preciosa, me encantó la comida y el arte" },
      { nombre: "Andrés Iniesta", avatar: "images/iniesta.png", texto: "Muy buena organización y guías amables" },
      { nombre: "Fernando Alonso", avatar: "images/fernando-alonso.jpg", texto: "Hotel céntrico y cómodo" },
      { nombre: "Pau Gasol", avatar: "images/pau-gasol.png", texto: "Excelente viaje, repetiría sin dudas" }
    ],
    paris: [
      { nombre: "Kylian Mbappé", avatar: "images/mbappe.png", texto: "La Torre Eiffel es increíble, Paris me fascinó" },
      { nombre: "Zinedine Zidane", avatar: "images/zidane.jpg", texto: "Buen viaje, muy romántico" },
      { nombre: "Paul Pogba", avatar: "images/pogba.png", texto: "Repetiría sin dudas" },
      { nombre: "Thierry Henry", avatar: "images/henry.jpg", texto: "Muy buena organización y guías amables" }
    ],
    londres: [
      { nombre: "David Beckham", avatar: "images/beckham.jpg", texto: "Londres tiene mucho que ofrecer, excelente viaje" },
      { nombre: "Alan Turing", avatar: "images/turing.jpg", texto: "Disfruté los museos y los paseos por el Támesis" },
      { nombre: "Dua Lipa", avatar: "images/dua-lipa.jpg", texto: "Hotel cómodo y céntrico" },
      { nombre: "Phil Collins", avatar: "images/phil-collins.avif", texto: "Muy buen servicio y atención" }
    ],
    "nueva-york": [
      { nombre: "The Rock", avatar: "images/rock.avif", texto: "NYC es impresionante, me encantó Times Square y Central Park" },
      { nombre: "Taylor Swift", avatar: "images/swift.jpg", texto: "Excelente viaje, repetiría sin dudas" },
      { nombre: "Mr Beast", avatar: "images/mrbeast.webp", texto: "El hotel y las excursiones perfectas" },
      { nombre: "Al Pacino", avatar: "images/al%20pacino.jpg", texto: "Todo muy bien organizado, 10/10" }
    ]
  };

  // --- Cargar opiniones (localStorage o base) ---
  let opiniones;
  try {
    const guardadas = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(guardadas) && guardadas.length) {
      // Migrar rutas viejas si existían
      opiniones = guardadas.map(op => ({
        ...op,
        avatar: fixAvatarPath(op.avatar)
      }));
      // Guardamos ya migrado para no repetir
      localStorage.setItem(STORAGE_KEY, JSON.stringify(opiniones));
    } else {
      opiniones = (opinionesBasePorDestino[destinoActual] || []).map(op => ({
        ...op,
        avatar: fixAvatarPath(op.avatar)
      }));
    }
  } catch (e) {
    opiniones = (opinionesBasePorDestino[destinoActual] || []).map(op => ({
      ...op,
      avatar: fixAvatarPath(op.avatar)
    }));
  }

  function guardarOpiniones() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(opiniones));
  }

  // --- Render ---
  function crearCard(op) {
    // Si existe <template>, lo usamos. Si no, creamos la estructura.
    if (template && "content" in template) {
      const clone = template.content.cloneNode(true);
      const card = clone.querySelector(".opinion-card");
      const nombreEl = clone.querySelector(".nombre-usuario");
      const textoEl = clone.querySelector(".texto-opinion");

      // Tu template tenía <div class="avatar"></div>; lo sustituimos por <img>
      const avatarContainer = clone.querySelector(".avatar");
      const img = document.createElement("img");
      img.className = "avatar";
      setImgWithFallback(img, op.avatar, `Avatar de ${op.nombre}`);
      if (avatarContainer) avatarContainer.replaceWith(img);

      if (nombreEl) nombreEl.textContent = op.nombre;
      if (textoEl) textoEl.textContent = op.texto;

      return card ? card : clone;
    }

    // Fallback sin template
    const card = document.createElement("article");
    card.className = "opinion-card";

    const user = document.createElement("div");
    user.className = "opinion-usuario";

    const img = document.createElement("img");
    img.className = "avatar";
    setImgWithFallback(img, op.avatar, `Avatar de ${op.nombre}`);

    const nombre = document.createElement("span");
    nombre.className = "nombre-usuario";
    nombre.textContent = op.nombre;

    const texto = document.createElement("p");
    texto.className = "texto-opinion";
    texto.textContent = op.texto;

    user.appendChild(img);
    user.appendChild(nombre);

    card.appendChild(user);
    card.appendChild(texto);

    return card;
  }

  function renderOpiniones() {
    contenedor.innerHTML = "";

    opiniones.forEach((op, index) => {
      const card = crearCard(op);

      // Solo mostrar el bloque visible
      const show = index >= contador && index < contador + VISIBLES;
      if (card instanceof HTMLElement) {
        card.style.display = show ? "block" : "none";
        contenedor.appendChild(card);
      } else {
        // Por si el template devolvió un fragmento
        // (normalmente no pasa, pero lo dejamos robusto)
        const wrapper = document.createElement("div");
        wrapper.appendChild(card);
        const el = wrapper.firstElementChild;
        if (el) {
          el.style.display = show ? "block" : "none";
          contenedor.appendChild(el);
        }
      }
    });

    updateArrows(opiniones.length);
  }

  // --- Navegación con flechas ---
  flechaDer.addEventListener("click", () => {
    if (contador + VISIBLES < opiniones.length) {
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

  // --- Enviar nueva opinión ---
  btnEnviar.addEventListener("click", () => {
    const texto = textarea.value.trim();
    if (!texto) return;

    // Intentar coger usuario de tu sistema
    let nombreUsuario = "Usuario anónimo";
    let avatarUsuario = "images/avatar_default.png";

    try {
      const sesion = JSON.parse(localStorage.getItem("sesion"));
      const usuarios = JSON.parse(localStorage.getItem("usuarios"));
      const usuario = sesion?.login && usuarios ? usuarios[sesion.login] : null;

      if (usuario?.nombre) nombreUsuario = usuario.nombre;
      if (usuario?.imagen) avatarUsuario = usuario.imagen; // puede venir "images/..." o dataURL
    } catch (_) {}

    const nuevaOpinion = {
      nombre: nombreUsuario,
      avatar: fixAvatarPath(avatarUsuario),
      texto
    };

    opiniones.unshift(nuevaOpinion);
    guardarOpiniones();

    contador = 0;
    textarea.value = "";
    renderOpiniones();
  });

  // --- Primer render ---
  renderOpiniones();
});
