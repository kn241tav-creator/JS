/**
 * Функція для підрахунку голосних літер у рядку
 * @param {string} str - Вихідний рядок
 * @returns {object} Об'єкт з кількістю голосних та їх позиціями
 */
function countVowelsFunc(str) {
  const vowels = "аеєиіїоуюяaeiouy";
  let count = 0;
  const vowelList = [];
  const indices = [];

  for (let i = 0; i < str.length; i++) {
    const char = str[i].toLowerCase();
    if (vowels.includes(char)) {
      count++;
      if (!vowelList.includes(char)) {
        vowelList.push(char);
      }
      indices.push(i);
    }
  }

  return {
    total: count,
    vowels: vowelList,
    indices: indices,
  };
}

/**
 * Функція для відображення результату
 */
function countVowels() {
  const inputText = document.getElementById("inputText").value;

  if (!inputText) {
    alert("Будь ласка, введіть текст!");
    return;
  }

  const result = countVowelsFunc(inputText);
  displayResult(inputText, result);
}

/**
 * Функція для відображення результату на сторінці
 */
function displayResult(text, result) {
  const container = document.getElementById("resultContainer");

  const vowelsStr = result.vowels.join(", ");
  const indicesStr = result.indices.join(", ");

  const html = `
        <div class="result">
            <div class="result-text">
                <strong>Введений текст:</strong> "${text}"
            </div>

            <div class="vowel-count">
                🔤 ${result.total} голосних літер
            </div>

            <div class="vowels-list">
                <strong>Унікальні голосні:</strong> ${
                  vowelsStr || "не знайдено"
                }
            </div>

            <div class="vowels-list">
                <strong>Індекси позицій:</strong> ${indicesStr}
            </div>
        </div>
    `;

  container.innerHTML = html;
}

// Підтримка Enter для виконання функції
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("inputText")
    .addEventListener("keypress", function (e) {
      if (e.ctrlKey && e.key === "Enter") {
        countVowels();
      }
    });
});
