/**
 * Функція для скорочення рядка
 * @param {string} str - Рядок для скорочення
 * @param {number} maxLength - Максимальна довжина
 * @returns {string} Скорочений рядок
 */
function shortenStringFunc(str, maxLength) {
  if (str.length > maxLength) {
    return str.substring(0, maxLength - 3) + "...";
  }
  return str;
}

/**
 * Функція для відображення результату
 */
function shortenString() {
  const textToShorten = document.getElementById("textToShorten").value;
  const maxLength = parseInt(document.getElementById("maxLength").value);

  if (!textToShorten) {
    alert("Будь ласка, введіть текст!");
    return;
  }

  if (isNaN(maxLength) || maxLength < 1) {
    alert("Будь ласка, введіть коректну максимальну довжину!");
    return;
  }

  const result = shortenStringFunc(textToShorten, maxLength);
  displayResult(textToShorten, result, maxLength);
}

/**
 * Функція для відображення результату на сторінці
 */
function displayResult(original, shortened, maxLength) {
  const container = document.getElementById("resultContainer");

  const wasShortened = original.length > maxLength;
  const status = wasShortened
    ? `✂️ Рядок скорочено (з ${original.length} на ${shortened.length} символів)`
    : `✅ Рядок залишився без змін (довжина: ${original.length})`;

  const html = `
        <div class="result">
            <div class="result-item">
                <div class="original-text">
                    <strong>Оригінальний текст:</strong> "${original}"
                </div>
                <div class="shortened-text">
                    <strong>Результат:</strong> "${shortened}"
                </div>
                <div class="info-text">${status}</div>
                <div class="comparison">
                    <div class="comparison-item">
                        <div>Оригінальна довжина</div>
                        <div class="comparison-value">${original.length}</div>
                    </div>
                    <div class="comparison-item">
                        <div>Максимальна довжина</div>
                        <div class="comparison-value">${maxLength}</div>
                    </div>
                    <div class="comparison-item">
                        <div>Нова довжина</div>
                        <div class="comparison-value">${shortened.length}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

  container.innerHTML = html;
}

// Підтримка Enter для виконання функції
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("textToShorten")
    .addEventListener("keypress", function (e) {
      if (e.ctrlKey && e.key === "Enter") {
        shortenString();
      }
    });

  document
    .getElementById("maxLength")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        shortenString();
      }
    });
});
