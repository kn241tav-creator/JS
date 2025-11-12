/**
 * Функція для переведення першого символу рядка у верхній регістр
 * @param {string} str - Вихідний рядок
 * @returns {string} Рядок з великою першою літерою
 */
function capitalizeFirstLetterFunc(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Функція для відображення результату
 */
function capitalizeFirstLetter() {
  const inputString = document.getElementById("inputString").value;

  if (!inputString) {
    alert("Будь ласка, введіть рядок!");
    return;
  }

  const result = capitalizeFirstLetterFunc(inputString);
  displayResult(inputString, result);
}

/**
 * Функція для відображення результату на сторінці
 */
function displayResult(original, converted) {
  const container = document.getElementById("resultContainer");

  const html = `
        <div class="result">
            <div class="result-item">
                <div class="original">Оригінальний рядок: "${original}"</div>
                <div class="converted">
                    ✓ Результат: "<strong>${converted}</strong>"
                </div>
            </div>
        </div>
    `;

  container.innerHTML = html;
}

// Підтримка Enter для виконання функції
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("inputString")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        capitalizeFirstLetter();
      }
    });
});
