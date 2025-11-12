/**
 * Функція для пошуку символу в рядку
 * @param {string} str - Рядок для пошуку
 * @param {string} char - Символ для пошуку
 * @returns {object} Об'єкт з інформацією про пошук
 */
function findCharacterFunc(str, char) {
  const indices = [];
  const lowerStr = str.toLowerCase();
  const lowerChar = char.toLowerCase();

  // Шукаємо індекси (без урахування регістру)
  for (let i = 0; i < lowerStr.length; i++) {
    if (lowerStr[i] === lowerChar) {
      indices.push(i);
    }
  }

  return {
    string: str,
    char: char,
    count: indices.length,
    indices: indices,
    found: indices.length > 0,
  };
}

/**
 * Функція для виділення символу в тексті
 */
function highlightCharacter(str, char) {
  const regex = new RegExp(`(${char})`, "gi");
  return str.replace(regex, `<span class="char-highlight">$1</span>`);
}

/**
 * Функція для відображення результату
 */
function findCharacter() {
  const searchString = document.getElementById("searchString").value;
  const searchChar = document.getElementById("searchChar").value;

  if (!searchString) {
    alert("Будь ласка, введіть рядок!");
    return;
  }

  if (!searchChar) {
    alert("Будь ласка, введіть символ для пошуку!");
    return;
  }

  const result = findCharacterFunc(searchString, searchChar);
  displayResult(result);
}

/**
 * Функція для відображення результату на сторінці
 */
function displayResult(result) {
  const container = document.getElementById("resultContainer");

  let indicesHtml = "";

  if (result.found) {
    const indicesList = result.indices
      .map((idx) => `<span class="index-badge">${idx}</span>`)
      .join("");

    indicesHtml = `
            <div class="indices-display">
                <div class="indices-label">Індекси знайдених позицій:</div>
                <div class="indices-list">
                    ${indicesList}
                </div>
            </div>
        `;
  }

  const highlightedText = highlightCharacter(result.string, result.char);

  const statusText = result.found
    ? `✅ Символ <span class="char-highlight">${result.char}</span> знайдено <strong>${result.count} рази</strong>`
    : `❌ Символ не знайдено`;

  const resultContent = result.found
    ? `
            <div class="result-item">
                <div class="input-text">
                    <strong>Рядок:</strong> ${result.string}
                </div>
                <div class="search-char">
                    <strong>Шуканий символ:</strong> <span class="char-highlight">${result.char}</span>
                </div>
                
                <div class="count-display">
                    🔍 ${result.count} входжень
                </div>
                
                ${indicesHtml}
                
                <div class="highlighted-string">
                    <strong>Виділений текст:</strong><br>
                    ${highlightedText}
                </div>
            </div>
        `
    : `
            <div class="no-results">
                ${statusText}
            </div>
        `;

  const html = `
        <div class="result">
            ${resultContent}
        </div>
    `;

  container.innerHTML = html;
}

// Підтримка Enter для виконання функції
document.addEventListener("DOMContentLoaded", function () {
  const searchString = document.getElementById("searchString");
  const searchChar = document.getElementById("searchChar");

  searchString.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      findCharacter();
    }
  });

  searchChar.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      findCharacter();
    }
  });
});
