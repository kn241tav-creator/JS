// calculator.js — логіка калькулятора (з новою назвою)
const el = (id) => document.getElementById(id);

function compute() {
  const num1 = parseFloat(el("num1").value);
  const num2 = parseFloat(el("num2").value);
  const op = el("operator").value;

  if (Number.isNaN(num1) || Number.isNaN(num2)) {
    el("result").textContent = "Помилка: введіть коректні числа";
    return;
  }

  let result;
  switch (op) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      if (num2 === 0) {
        el("result").textContent = "Помилка: ділення на нуль";
        return;
      }
      result = num1 / num2;
      break;
    case "%":
      result = num1 % num2;
      break;
    case "**":
      result = Math.pow(num1, num2);
      break;
    default:
      el("result").textContent = "Невідомий оператор";
      return;
  }

  el("result").textContent = `${num1} ${op} ${num2} = ${result}`;
}

el("calc").addEventListener("click", compute);

el("clear").addEventListener("click", () => {
  el("num1").value = "";
  el("num2").value = "";
  el("result").textContent = "Результат тут";
  el("num1").focus();
});

el("num1").addEventListener("keydown", (e) => {
  if (e.key === "Enter") compute();
});
el("num2").addEventListener("keydown", (e) => {
  if (e.key === "Enter") compute();
});
