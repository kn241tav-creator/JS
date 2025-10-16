// receipt_form.js — логіка для форми розрахунку чеку (нова назва)
const $ = (id) => document.getElementById(id);

function formatMoney(n) {
  return Number(n).toLocaleString("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function computeReceipt() {
  const name = $("name").value || "Товар";
  const price = parseFloat($("price").value) || 0;
  const qty = parseFloat($("qty").value) || 0;
  const markup = parseFloat($("markup").value) || 0;
  const vat = parseFloat($("vat").value) || 0;

  const priceWithMarkup = +(price * (1 + markup)).toFixed(2);
  const sumWithoutVat = +(priceWithMarkup * qty).toFixed(2);
  const vatSum = +(sumWithoutVat * vat).toFixed(2);
  const total = +(sumWithoutVat + vatSum).toFixed(2);

  const text = `=== ТОВАРНИЙ ЧЕК ===\nНазва товару: ${name}\nКількість: ${qty}\nЦіна за одиницю (базова): ${formatMoney(
    price
  )}\nЦіна за одиницю (з націнкою): ${formatMoney(
    priceWithMarkup
  )}\nСума без ПДВ: ${formatMoney(sumWithoutVat)}\nПДВ (${
    vat * 100
  }%): ${formatMoney(vatSum)}\nЗагальна сума до сплати: ${formatMoney(total)}`;

  $("result").textContent = text;
}

$("calc").addEventListener("click", computeReceipt);
$("clear").addEventListener("click", () => {
  $("name").value = "";
  $("price").value = "";
  $("qty").value = "";
  $("markup").value = "";
  $("vat").value = "";
  $("result").textContent = "Тут буде чек";
  $("name").focus();
});

// Enter support
["name", "price", "qty", "markup", "vat"].forEach((id) => {
  $(id).addEventListener("keydown", (e) => {
    if (e.key === "Enter") computeReceipt();
  });
});
