// zavd2.js
// Завдання 2: арифметичні та логічні операції

let x = 10;
let y = 5;

console.log("x =", x);
console.log("y =", y);

// Сума
console.log("Сума x + y =", x + y);

// Різниця
console.log("Різниця x - y =", x - y);

// Добуток
console.log("Добуток x * y =", x * y);

// Ділення
console.log("Ділення x / y =", x / y);

// Порівняння >
console.log("x > y =", x > y);

// Рівність ===
console.log("x === y =", x === y);

// Інкремент/декремент (префіксна та постфіксна форми)
let a = x; // клонуємо для демонстрації
console.log("a (before) =", a);
console.log("Постфіксний інкремент a++ =", a++); // виведе поточне, потім збільшить
console.log("a (after post-increment) =", a);

let b = y;
console.log("b (before) =", b);
console.log("Префіксний інкремент ++b =", ++b); // збільшить, потім виведе
console.log("b (after pre-increment) =", b);

// Декремент приклад
let c = x;
console.log("c-- (post-decrement) =", c--);
console.log("c (after post-decrement) =", c);

let d = y;
console.log("--d (pre-decrement) =", --d);
console.log("d (after pre-decrement) =", d);

// Порада: змінюйте значення x і y та перезапускайте цей файл для перевірки
