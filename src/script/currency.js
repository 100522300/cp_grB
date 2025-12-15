/** Tasas fijas respecto a EUR; no dependo de APIs. */
const RATES = { EUR: 1, USD: 1.1, GBP: 0.85 };

/** Símbolos que quiero mostrar al formatear. */
const SYMBOLS = { EUR: "€", USD: "$", GBP: "£" };

/** Clave única para guardar la preferencia en localStorage. */
const STORAGE_KEY = "currency";

/** Devuelve el texto listo para pintar con símbolo y dos decimales. */
function formatCurrency(amount, currency) {
  return `${SYMBOLS[currency] || ""} ${amount.toFixed(2)}`;
}

/** Recorre todos los .js-price y convierte desde EUR a la moneda elegida. */
function renderPrices(currency) {
  document.querySelectorAll(".js-price").forEach((el) => {
    const base = parseFloat(el.dataset.eur);
    if (!Number.isFinite(base)) {
      el.textContent = "-";
      return;
    }
    const rate = RATES[currency] || 1;
    el.textContent = formatCurrency(base * rate, currency);
  });
}

/** Arranca todo: lee storage, actualiza el select y pinta precios. */
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

/** Espero al DOM y ejecuto. */
document.addEventListener("DOMContentLoaded", initCurrency);
