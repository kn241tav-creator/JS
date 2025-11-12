/**
 * Функція для перевірки спаму в рядку
 * @param {string} str - Текст для перевірки
 * @returns {object} Об'єкт з інформацією про спам
 */
function checkSpamFunc(str) {
  // Список спам-слів та фраз
  const spamWords = [
    "безкоштовно",
    "100%",
    "гарантія",
    "збільшення продажів",
    "тільки сьогодні",
    "негайно",
    "потрібно поспішати",
    "обмежена пропозиція",
    "переходь",
    "клікни",
    "не пропусти",
    "секретний",
    "виграй",
    "бонус",
    "даремно",
    "рекордна ціна",
    "найкраща ціна",
  ];

  const foundSpams = [];
  const lowerStr = str.toLowerCase();

  // Перевіряємо кожне спам-слово
  for (let spamWord of spamWords) {
    if (lowerStr.includes(spamWord)) {
      foundSpams.push(spamWord);
    }
  }

  return {
    isSpam: foundSpams.length > 0,
    foundSpams: foundSpams,
    count: foundSpams.length,
  };
}

/**
 * Функція для відображення результату
 */
function checkSpam() {
  const inputText = document.getElementById("inputText").value;

  if (!inputText) {
    alert("Будь ласка, введіть текст!");
    return;
  }

  const result = checkSpamFunc(inputText);
  displayResult(inputText, result);
}

/**
 * Функція для відображення результату на сторінці
 */
function displayResult(text, result) {
  const container = document.getElementById("resultContainer");

  let statusClass = result.isSpam ? "spam-detected" : "spam-clean";
  let statusText = result.isSpam
    ? "🚨 СПАМ ВИЯВЛЕНИЙ!"
    : "✅ Спаму не знайдено";

  let spamWordsHtml = "";
  if (result.foundSpams.length > 0) {
    const spamListItems = result.foundSpams
      .map((word) => `<li>"${word}"</li>`)
      .join("");
    spamWordsHtml = `
            <div class="spam-words">
                <strong>Знайдені спам-слова (${result.count}):</strong>
                <ul class="spam-list">
                    ${spamListItems}
                </ul>
            </div>
        `;
  }

  const html = `
        <div class="result">
            <div class="result-text">
                <strong>Введений текст:</strong> "${text}"
            </div>

            <div class="spam-status ${statusClass}">
                ${statusText}
            </div>

            ${spamWordsHtml}
        </div>
    `;

  container.innerHTML = html;
}

// Підтримка Ctrl+Enter для виконання функції
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("inputText")
    .addEventListener("keypress", function (e) {
      if (e.ctrlKey && e.key === "Enter") {
        checkSpam();
      }
    });
});
