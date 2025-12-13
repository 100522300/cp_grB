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
  const login = sacarLogin();
  if (!login) return;

  /* esto detecta que estamos en la página de resultados (si no existe, no hace nada) */
  const bloqueResultados = document.querySelector(".cuerpo-resultados");
  if (!bloqueResultados) return;

  /* pillo el nombre del destino principal (en tu html es el h3 de la parte "Mejor valorado") */
  const h3 = document.querySelector(".mejor-valorado .informacion-busqueda h3");
  if (!h3) return;

  const titulo = h3.textContent.trim();
  if (!titulo) return;

  const id = limpiarId(titulo);

  /* guardo como url la página actual (para que al click te lleve a resultados) */
  const url = window.location.pathname.split("/").pop() || "resultados.html";

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
