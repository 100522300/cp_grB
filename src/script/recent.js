const claveSesion = "sesion";
const prefijoVistos = "vistos_";
const maxVistos = 3;

function sacarLogin() {
  /* saco el login del localStorage */
  const texto = localStorage.getItem(claveSesion);
  if (!texto) return null;

  try {
    const obj = JSON.parse(texto);
    return obj.login || null;
  } catch (e) {
    return null;
  }
}

function leerVistos(login) {
  /* leo el array de vistos del usuario */
  if (!login) return [];

  const texto = localStorage.getItem(prefijoVistos + login);
  if (!texto) return [];

  try {
    return JSON.parse(texto);
  } catch (e) {
    return [];
  }
}

function guardarVistos(login, lista) {
  /* guardo el array de vistos del usuario */
  if (!login) return;
  localStorage.setItem(prefijoVistos + login, JSON.stringify(lista));
}

function limpiarId(texto) {
  /* convierto "Tokyo" o "Desierto Rojo" en un id simple tipo "tokyo" o "desierto-rojo" */
  return String(texto)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

function meterVisto(login, item) {
  /* meto un visto arriba, sin repetir, y maximo 3 */
  if (!login) return;

  let lista = leerVistos(login);

  lista = lista.filter(function (x) {
    return x.id !== item.id;
  });

  lista.unshift(item);

  if (lista.length > maxVistos) {
    lista = lista.slice(0, maxVistos);
  }

  guardarVistos(login, lista);
}

function guardarVistoSiEstoyEnResultados() {
  /* si estoy en resultados.html, guardo el destino principal al cargar */

  /* 1. Detectar si es resultados */
  if (!window.location.pathname.includes("resultados.html")) return;

  const login = sacarLogin();
  if (!login) return;

  /* 2. Leer URL param para saber el destino real (no el del HTML estático) */
  const params = new URLSearchParams(window.location.search);
  const destinoParam = params.get("destino");

  if (!destinoParam) return; // Si no hay param, no guardamos nada (o guardamos Tokyo por defecto si quisieras)

  /* 3. Mapeo simple para títulos bonitos (copiado de resultados_dinamico/busqueda para consistencia) */
  const mapas = {
    "tokyo": "Tokyo",
    "madrid": "Madrid",
    "paris": "París",
    "londres": "Londres",
    "nueva-york": "Nueva York",
    "viena": "Viena",
    "brujas": "Brujas"
    // Se pueden añadir más si hace falta, o usar el slug capitalizado por defecto
  };

  let titulo = mapas[destinoParam];
  if (!titulo) {
    // Fallback: Capitalizar primera letra
    titulo = destinoParam.charAt(0).toUpperCase() + destinoParam.slice(1);
  }

  const id = limpiarId(titulo);

  /* 4. Guardar la URL COMPLETA con parámetros */
  // Asumimos que queremos volver a ver lo mismo
  const url = `resultados.html?destino=${destinoParam}`;

  meterVisto(login, { id: id, titulo: titulo, url: url });
}

function pintarVistos() {
  /* en perfil: pinto lo que haya dentro de la caja de vistos */
  const caja = document.querySelector(".caja-vistos");
  if (!caja) return;

  const login = sacarLogin();

  if (!login) {
    caja.innerHTML = "<p>Aún no has visto destinos.</p>";
    return;
  }

  const lista = leerVistos(login);

  if (lista.length === 0) {
    caja.innerHTML = "<p>Aún no has visto destinos.</p>";
    return;
  }

  caja.innerHTML = "";

  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";
  ul.style.margin = "0";

  lista.forEach(function (item) {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = item.url || "#";
    a.textContent = item.titulo || item.id;

    li.appendChild(a);
    ul.appendChild(li);
  });

  caja.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", function () {
  /* al entrar a resultados se guarda el visto, al entrar a perfil se pinta */
  guardarVistoSiEstoyEnResultados();
  pintarVistos();
});
