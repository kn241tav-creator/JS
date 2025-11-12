/**
 * ЗАВДАННЯ 7 - СПИСОК ПОКУПОК
 * Робота з масивом об'єктів: { name, quantity, purchased }
 */

/**
 * Масив для зберігання списку покупок
 * Кожен елемент: { name: string, quantity: number, purchased: boolean }
 */
let shoppingList = [
  { name: "Молоко", quantity: 2, purchased: false },
  { name: "Хліб", quantity: 1, purchased: false },
  { name: "Вода", quantity: 6, purchased: true },
];

/**
 * ФУНКЦІЯ 1: Виведення всього списку на екран
 * Спочатку - непокупані продукти (червоні), потім - куплені (зелені)
 */
function displayShoppingList() {
  const tableBody = document.getElementById("tableBody");

  // Розділяємо на дві категорії
  const unpurchasedItems = shoppingList.filter((item) => !item.purchased);
  const purchasedItems = shoppingList.filter((item) => item.purchased);

  let html = "";

  // ВИВОДИМО НЕПОКУПАНІ ТОВАРИ (ЧЕРВОНІ)
  unpurchasedItems.forEach((item) => {
    html += `
            <tr class="unpurchased">
                <td>${escapeHtml(item.name)}</td>
                <td>${item.quantity}</td>
                <td>false</td>
            </tr>
        `;
  });

  // ВИВОДИМО КУПЛЕНІ ТОВАРИ (ЗЕЛЕНІ)
  purchasedItems.forEach((item) => {
    html += `
            <tr class="purchased">
                <td>${escapeHtml(item.name)}</td>
                <td>${item.quantity}</td>
                <td>true</td>
            </tr>
        `;
  });

  if (html === "") {
    html =
      '<tr><td colspan="3" style="text-align: center; color: #999;">Список пустий</td></tr>';
  }

  tableBody.innerHTML = html;
}

/**
 * ФУНКЦІЯ 2: Додавання продукту до списку
 * ❗ ВАЖЛИВЕ ПРАВИЛО: Якщо продукт вже існує, збільшуємо кількість,
 * а не додаємо новий елемент!
 */
function addProduct() {
  const nameInput = document.getElementById("productName");
  const quantityInput = document.getElementById("productQuantity");
  const infoText = document.getElementById("infoText");

  const name = nameInput.value.trim();
  const quantity = parseFloat(quantityInput.value);

  // Валідація
  if (!name) {
    infoText.textContent = "❌ Введіть назву товару!";
    infoText.style.color = "#e74c3c";
    return;
  }

  if (isNaN(quantity) || quantity <= 0) {
    infoText.textContent = "❌ Введіть коректну кількість!";
    infoText.style.color = "#e74c3c";
    return;
  }

  // 🔍 ПОШУК: Шукаємо, чи вже існує такий продукт
  const existingProduct = shoppingList.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );

  if (existingProduct) {
    // ➕ ЯКЩО ТОВАР ІСНУЄ: Збільшуємо кількість (не додаємо новий!)
    existingProduct.quantity += quantity;
    infoText.textContent = `✓ Кількість для "${name}" збільшена на ${quantity}!`;
    infoText.style.color = "#27ae60";
  } else {
    // ➕ ЯКЩО ТОВАРУ НЕ ІСНУЄ: Додаємо новий продукт
    shoppingList.push({
      name: name,
      quantity: quantity,
      purchased: false,
    });
    infoText.textContent = `✓ Товар "${name}" додано до списку!`;
    infoText.style.color = "#27ae60";
  }

  // Очищуємо інпути та фокусуємо
  nameInput.value = "";
  quantityInput.value = "1";
  nameInput.focus();

  displayShoppingList();
}

/**
 * ФУНКЦІЯ 3: Купівля продукту
 * Приймає назву продукту і помічає його як придбаний
 */
function buyProduct() {
  const productNameInput = document.getElementById("buyProductName");
  const infoText = document.getElementById("infoText");
  const productName = productNameInput.value.trim();

  if (!productName) {
    infoText.textContent = "❌ Введіть назву товару для покупки!";
    infoText.style.color = "#e74c3c";
    return;
  }

  const product = shoppingList.find(
    (item) => item.name.toLowerCase() === productName.toLowerCase()
  );

  if (!product) {
    infoText.textContent = `❌ Товар "${productName}" не знайдено в списку!`;
    infoText.style.color = "#e74c3c";
    return;
  }

  if (product.purchased) {
    infoText.textContent = `⚠️ Товар "${productName}" вже куплено!`;
    infoText.style.color = "#f39c12";
    return;
  }

  product.purchased = true;
  infoText.textContent = `✓ "${product.name}" позначено як придбаний!`;
  infoText.style.color = "#27ae60";

  productNameInput.value = "";
  productNameInput.focus();

  displayShoppingList();
}

/**
 * Допоміжна функція для екранування HTML символів (безпека)
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
 * Підтримка Enter для додавання продукту
 */
document.addEventListener("DOMContentLoaded", function () {
  const productInput = document.getElementById("productName");
  const quantityInput = document.getElementById("productQuantity");
  const buyInput = document.getElementById("buyProductName");

  productInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addProduct();
    }
  });

  quantityInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addProduct();
    }
  });

  buyInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      buyProduct();
    }
  });

  // Першого разу виводимо список
  displayShoppingList();
});
