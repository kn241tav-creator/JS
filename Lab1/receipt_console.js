// receipt_console.js — консольний скрипт для формування чеку

const productName = "Ноутбук";
const basePrice = 20000; // за одиницю
const quantity = 2;
const markup = 0.2; // 20%
const VAT = 0.2; // 20%

const priceWithMarkup = +(basePrice * (1 + markup)).toFixed(2);
const sumWithoutVAT = +(priceWithMarkup * quantity).toFixed(2);
const vatAmount = +(sumWithoutVAT * VAT).toFixed(2);
const total = +(sumWithoutVAT + vatAmount).toFixed(2);

console.log("=== ТОВАРНИЙ ЧЕК ===");
console.log("Назва товару:", productName);
console.log("Кількість:", quantity);
console.log("Ціна за одиницю (базова):", basePrice);
console.log("Ціна за одиницю (з націнкою):", priceWithMarkup);
console.log("Сума без ПДВ:", sumWithoutVAT);
console.log("ПДВ (20%):", vatAmount);
console.log("Загальна сума до сплати:", total);
