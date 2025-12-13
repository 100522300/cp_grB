# cp_grB
Trabajo final interfaces de usuario

## Funcionalidad de selección de moneda

- **Moneda base interna**: EUR. Todos los precios reales se guardan en `data-eur` como número limpio (sin símbolos ni separadores).
- **Monedas soportadas**: EUR, USD, GBP. Tasas fijas en `script/currency.js`: `{ EUR: 1, USD: 1.1, GBP: 0.85 }`.
- **Selector global**: Se añadió un `<select id="currency-select" class="btn-seleccionar-moneda">` en el header de todas las páginas principales (index, página principal, resultados, perfil, compra, ayuda, sesión, registro, newsletter). La elección se guarda en `localStorage` con la clave `currency`.
- **Marcado de precios**: Los precios convertibles usan `<span class="js-price" data-eur="..."></span>`. Ejemplos:
  - `resultados.html`: 2150, 1850, 590, 3400.
  - `perfil.html`: reservas 320 y 1050 (sin puntos de miles).
- **JS reutilizable**: Nuevo archivo `script/currency.js` (no módulo, sin dependencias). Flujo:
  1. Lee la moneda guardada o usa EUR por defecto.
  2. Ajusta el valor del selector si existe.
  3. Recorre `.js-price`, convierte con la tasa y muestra con símbolo y dos decimales.
  4. En `change` del selector, guarda en `localStorage` y re-renderiza al instante.
- **Manejo básico de errores**: Si `data-eur` no es numérico, muestra `—`. Si falta el selector en una página, el script no rompe.

### Snippet de referencia (`script/currency.js`)

```js
const RATES = { EUR: 1, USD: 1.1, GBP: 0.85 };
const SYMBOLS = { EUR: "€", USD: "$", GBP: "£" };
const STORAGE_KEY = "currency";

function formatCurrency(amount, currency) {
  return `${SYMBOLS[currency] || ""} ${amount.toFixed(2)}`;
}

function renderPrices(currency) {
  document.querySelectorAll(".js-price").forEach((el) => {
    const base = parseFloat(el.dataset.eur);
    if (!Number.isFinite(base)) {
      el.textContent = "—";
      return;
    }
    el.textContent = formatCurrency(base * (RATES[currency] || 1), currency);
  });
}

function initCurrency() {
  const selector = document.getElementById("currency-select");
  const saved = localStorage.getItem(STORAGE_KEY);
  const current = RATES[saved] ? saved : "EUR";

  if (selector) {
    selector.value = current;
    selector.addEventListener("change", () => {
      const choice = selector.value;
      localStorage.setItem(STORAGE_KEY, choice);
      renderPrices(choice);
    });
  }

  renderPrices(current);
}

document.addEventListener("DOMContentLoaded", initCurrency);
```

### Cómo probar
- Cambia de EUR → USD → GBP en `resultados.html` y verifica que todos los precios cambien.
- Abre `perfil.html`: la moneda seleccionada se conserva y los precios salen convertidos.
- Recarga la página: se mantiene la moneda elegida (persistencia en `localStorage`).
- Páginas sin precios no muestran errores en consola.
