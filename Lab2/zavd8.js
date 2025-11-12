/**
 * ЗАВДАННЯ 8 - ЧЕК МАГАЗИНУ (на відмінну оцінку)
 * Створить масив із куплених товарів та реалізуйте функції:
 * 1. Виведення чека на екран
 * 2. Підрахунок загальної суми
 * 3. Отримання найдорожчої покупки
 * 4. Підрахунок середньої вартості товару
 */

/**
 * Масив з куплених товарів (товари зі статусом true із завдання 7)
 * Структура: { name, quantity, pricePerUnit }
 */
let receipt = [
  { name: "Хліб", quantity: 2, pricePerUnit: 20 },
  { name: "Молоко", quantity: 1, pricePerUnit: 25 },
  { name: "Яблука", quantity: 5, pricePerUnit: 15 },
  { name: "Масло", quantity: 1, pricePerUnit: 50 },
  { name: "Цукор", quantity: 3, pricePerUnit: 30 },
];

/**
 * ФУНКЦІЯ 1: Виведення чека на екран
 * Виводить таблицю з усіма товарами, кількостями, цінами та сумами
 */
function displayReceipt() {
  const container = document.getElementById("receiptContainer");

  if (receipt.length === 0) {
    container.innerHTML =
      '<div class="empty-state"><div class="empty-state-icon">🛒</div><p>Чек пустий!</p></div>';
    return;
  }

  // Будуємо таблицю чека
  let receiptHTML = `
        <div class="receipt-section">
            <div class="receipt-header">
                <h2>🛒 ЧЕК ПОКУПОК</h2>
                <p>Магазин "Продукти" - ${new Date().toLocaleDateString(
                  "uk-UA"
                )}</p>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Назва товару</th>
                        <th class="text-right">Кількість</th>
                        <th class="text-right">Ціна за од. (грн)</th>
                        <th class="text-right">Загальна вартість (грн)</th>
                    </tr>
                </thead>
                <tbody>
    `;

  // Додаємо кожен товар у таблицю
  receipt.forEach((item, index) => {
    const totalPrice = item.quantity * item.pricePerUnit;
    receiptHTML += `
            <tr>
                <td>${escapeHtml(item.name)}</td>
                <td class="text-right">${item.quantity}</td>
                <td class="text-right">${item.pricePerUnit}</td>
                <td class="text-right"><strong>${totalPrice}</strong></td>
            </tr>
        `;
  });

  receiptHTML += `
                </tbody>
            </table>
            
            <div class="receipt-separator"></div>
    `;

  // Додаємо інформаційні блоки
  const totalSum = calculateTotalSumValue();
  const averagePrice = calculateAveragePriceValue();
  const expensiveItem = getExpensivePurchaseObj();

  receiptHTML += `
        <div class="info-box">
            <div class="info-label">💰 Загальна сума покупки</div>
            <div class="info-value">${totalSum} грн</div>
        </div>
        
        <div class="info-box">
            <div class="info-label">⭐ Найдорожча покупка</div>
            <div class="info-value">${escapeHtml(expensiveItem.name)} - ${
    expensiveItem.totalCost
  } грн</div>
        </div>
        
        <div class="info-box">
            <div class="info-label">📊 Середня вартість одного товару</div>
            <div class="info-value">${averagePrice} грн</div>
        </div>
        
        <div class="receipt-footer">
            Дякуємо за покупку! 🙏
        </div>
    `;

  receiptHTML += "</div>";
  container.innerHTML = receiptHTML;
}

/**
 * ФУНКЦІЯ 2: Підрахунок загальної суми покупки
 * Суму = sum(quantity * pricePerUnit) для всіх товарів
 */
function calculateTotalSumValue() {
  const total = receipt.reduce((sum, item) => {
    return sum + item.quantity * item.pricePerUnit;
  }, 0);

  return total;
}

/**
 * Функція для виведення загальної суми
 */
function calculateTotalSum() {
  const total = calculateTotalSumValue();
  document.getElementById("totalSum").textContent = `${total} грн`;
  showStats();
}

/**
 * ФУНКЦІЯ 3: Отримання найдорожчої покупки у чеку
 * Шукаємо товар з найбільшою загальною вартістю
 */
function getExpensivePurchaseObj() {
  if (receipt.length === 0) return null;

  let maxItem = receipt[0];
  let maxCost = receipt[0].quantity * receipt[0].pricePerUnit;

  for (let i = 1; i < receipt.length; i++) {
    const currentCost = receipt[i].quantity * receipt[i].pricePerUnit;
    if (currentCost > maxCost) {
      maxCost = currentCost;
      maxItem = receipt[i];
    }
  }

  return {
    name: maxItem.name,
    totalCost: maxCost,
    quantity: maxItem.quantity,
    pricePerUnit: maxItem.pricePerUnit,
  };
}

/**
 * Функція для виведення найдорожчої покупки
 */
function getExpensivePurchase() {
  const expensive = getExpensivePurchaseObj();
  if (expensive) {
    document.getElementById(
      "expensiveItem"
    ).textContent = `${expensive.name} - ${expensive.totalCost} грн`;
  }
  showStats();
}

/**
 * ФУНКЦІЯ 4: Підрахунок середньої вартості одного товару у чеку
 * Середня = (sum(quantity * pricePerUnit)) / (sum(quantity))
 */
function calculateAveragePriceValue() {
  if (receipt.length === 0) return 0;

  // Загальна вартість
  const totalCost = receipt.reduce((sum, item) => {
    return sum + item.quantity * item.pricePerUnit;
  }, 0);

  // Загальна кількість товарів
  const totalQuantity = receipt.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  // Середня вартість = загальна вартість / загальна кількість
  const average =
    totalQuantity > 0 ? (totalCost / totalQuantity).toFixed(2) : 0;

  return average;
}

/**
 * Функція для виведення середньої вартості
 */
function calculateAveragePrice() {
  const average = calculateAveragePriceValue();
  showStats();
}

/**
 * Функція для показу всіх статистик одночасно
 */
function showStats() {
  const totalSum = calculateTotalSumValue();
  const averagePrice = calculateAveragePriceValue();
  const expensive = getExpensivePurchaseObj();

  const statsHTML = `
        <div class="stat-card">
            <h3>💰 Загальна сума</h3>
            <div class="value">${totalSum} грн</div>
        </div>
        
        <div class="stat-card">
            <h3>⭐ Найдорожча покупка</h3>
            <div class="value">${expensive.name}</div>
            <p style="font-size: 14px; color: #e74c3c; margin-top: 8px;">${
              expensive.totalCost
            } грн</p>
        </div>
        
        <div class="stat-card">
            <h3>📊 Середня вартість</h3>
            <div class="value">${averagePrice} грн</div>
        </div>
        
        <div class="stat-card">
            <h3>🛒 Кількість товарів</h3>
            <div class="value">${receipt.reduce(
              (sum, item) => sum + item.quantity,
              0
            )}</div>
        </div>
    `;

  document.getElementById("statsContainer").innerHTML = statsHTML;
}

/**
 * Допоміжна функція для екранування HTML
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Ініціалізація при завантаженні сторінки
 */
document.addEventListener("DOMContentLoaded", function () {
  showStats();
});
