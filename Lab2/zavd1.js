/**
 * Функція для порівняння довжини двох рядків
 * @param {string} str1 - Перший рядок
 * @param {string} str2 - Другий рядок
 * @returns {object} Об'єкт з інформацією про рядки та їх довжину
 */
function compareStrings() {
  // Отримуємо значення з input полів
  const str1 = document.getElementById("string1").value;
  const str2 = document.getElementById("string2").value;

  // Перевіряємо, чи обидва поля заповнені
  if (!str1 || !str2) {
    alert("Будь ласка, введіть обидва рядки!");
    return;
  }

  // Отримуємо довжину рядків
  const len1 = str1.length;
  const len2 = str2.length;

  // Визначаємо, який рядок довший
  const result = {
    string1: str1,
    string2: str2,
    length1: len1,
    length2: len2,
    longerString: len1 > len2 ? "string1" : len2 > len1 ? "string2" : "equal",
  };

  // Виводимо результат
  displayResult(result);
}

/**
 * Функція для відображення результату порівняння з CSS-виділенням
 * @param {object} result - Об'єкт з результатами порівняння
 */
function displayResult(result) {
  const container = document.getElementById("resultContainer");

  const resultHTML = `
        <div class="result">
            <div class="result-title">Результат порівняння:</div>
            
            <div class="string-display ${
              result.longerString === "string1" ? "longer" : "normal"
            }">
                <strong>Перший рядок:</strong> "${result.string1}"
                <div class="info">Довжина: ${result.length1} символів</div>
            </div>
            
            <div class="string-display ${
              result.longerString === "string2" ? "longer" : "normal"
            }">
                <strong>Другий рядок:</strong> "${result.string2}"
                <div class="info">Довжина: ${result.length2} символів</div>
            </div>
            
            <div class="info" style="margin-top: 15px; border-left-color: #ff9800; background-color: #fff3e0; color: #e65100;">
                <strong>Висновок:</strong> 
                ${
                  result.longerString === "equal"
                    ? `Обидва рядки мають однакову довжину (${result.length1} символів)`
                    : `<span style="background-color: #FFD700; padding: 2px 6px; border-radius: 3px;">
                        ${
                          result.longerString === "string1"
                            ? "Перший"
                            : "Другий"
                        } рядок довший на ${Math.abs(
                        result.length1 - result.length2
                      )} символ(ів)
                       </span>`
                }
            </div>
        </div>
    `;

  container.innerHTML = resultHTML;
}

// Дозволяємо порівняти при натисненні Enter
document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        compareStrings();
      }
    });
  });
});
