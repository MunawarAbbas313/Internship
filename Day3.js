// ==========================================
// 🚀 Types of Loops in JavaScript
// ==========================================

// for        → When you know how many times to loop
// while      → When the number of iterations is unknown
// do...while → Similar to while, but runs at least once
// for...of   → Loop over iterable items (like arrays, strings)
// for...in   → Loop over object keys

// ==========================================
// 1️⃣ for Loop
// ==========================================
// Used when you know how many times you want to run the loop.

for (let i = 1; i <= 5; i++) {
  console.log("Count:", i); // will print 1, 2, 3, 4, 5
}
// 🧠 Use Case: Repeating a task N times (e.g., printing list items, creating multiple divs)

// ==========================================
// 2️⃣ while Loop
// ==========================================
// Used when you don't know how many times you'll run, 
// but want to keep looping until a condition becomes false.

let num = 1;
while (num <= 5) {
  console.log("Number is:", num); // will print 1 to 5
  num++; // Increment to avoid infinite loop
}
// 🧠 Use Case: Keep asking for valid input until correct input is given

// ==========================================
// 3️⃣ do...while Loop
// ==========================================
// Like `while`, but it runs the loop body at least once,
// even if the condition is false at the start.

let count = 6;
do {
  console.log("Value is:", count); // prints once even though count > 5
  count++;
} while (count <= 5);
// 🧠 Use Case: Show a form once, then ask to repeat if needed

// ==========================================
// 4️⃣ for...of Loop (ES6+)
// ==========================================
// Used to iterate over iterable items like arrays or strings.

const colors = ['red', 'green', 'blue'];

for (const color of colors) {
  console.log("Color:", color); // prints each color
}
// 🧠 Use Case: Read items from an array, string, map, set, etc.

// Loop through characters in a string
let name = "Munawar";
for (let char of name) {
  console.log(char); // M u n a w a r
}

// ==========================================
// 5️⃣ for...in Loop
// ==========================================
// Used to iterate over object keys.

const person = {
  name: "Munawar",
  age: 21,
  skill: "React Developer"
};

for (let key in person) {
  console.log(key, ":", person[key]);
  // Output: name : Munawar, age : 21, skill : React Developer
}
// 🧠 Use Case: Loop through properties of objects

// ==========================================
// 🔒 ⚠️ Important Notes
// ==========================================

// - Always update loop variable (e.g., i++, num++) to avoid infinite loops.
// - Use `break` to exit the loop completely.
// - Use `continue` to skip the current iteration.

// Example: break
for (let i = 1; i <= 5; i++) {
  if (i === 3) break; // loop stops when i is 3
  console.log(i);     // Output: 1, 2
}

// Example: continue
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue; // skip this iteration
  console.log(i);        // Output: 1, 2, 4, 5
}

// ==========================================
// ✅ When to Use What?
// ==========================================

// Loop Type   → Best For
// --------------------------------------
// for         → Fixed number of steps (e.g., loop 10 times)
// while       → Unknown repetitions until a condition is met
// do...while  → Ensure one-time execution before condition check
// for...of    → Iterating over Arrays, Strings, Sets
// for...in    → Iterating over Object keys

// ==========================================
// End of Loops & Equality Notes
// ==========================================
