// =====================
// 1. Type Conversion
// =====================

// Type Coercion (automatic)
console.log("5" == 5);    // true - "5" is coerced to number
console.log("5" === 5);   // false - strict check, no conversion

// Type Casting (manual)
console.log(Number("123"));   // 123
console.log(String(456));     // "456"
console.log(Boolean(0));      // false (falsy value)


// =====================
// 2. Set
// =====================

const fruits = new Set(["apple", "banana", "apple"]); // unique values only
fruits.add("orange");
console.log(fruits);            // Set(3) { 'apple', 'banana', 'orange' }
console.log(fruits.has("banana")); // true
fruits.delete("apple");         // removes 'apple'


// =====================
// 3. Map
// =====================

const studentMarks = new Map();
studentMarks.set("Ali", 90);
studentMarks.set("Sara", 85);
console.log(studentMarks.get("Ali")); // 90
console.log(studentMarks.has("Sara")); // true


// =====================
// 4. JSON
// =====================

const user = { name: "John", age: 30 };
const jsonString = JSON.stringify(user);  // object → JSON string
console.log(jsonString);                  // '{"name":"John","age":30}'

const parsedObj = JSON.parse(jsonString); // JSON string → object
console.log(parsedObj.name);              // John


// =====================
// 5. Object vs Map vs Set
// =====================

const obj = { name: "Ali", age: 25 };  // Object (string keys only)
const map = new Map();                 // Map (any type keys)
map.set("name", "Ali");
const set = new Set(["a", "b", "a"]);  // Set (unique values only)
console.log(set);                      // Set(2) { 'a', 'b' }


// =====================
// 6. Arrays and Common Methods
// =====================

let arr = [1, 2, 3];

// push & pop (end)
arr.push(4);     // [1, 2, 3, 4]
arr.pop();       // [1, 2, 3]

// unshift & shift (start)
arr.unshift(0);  // [0, 1, 2, 3]
arr.shift();     // [1, 2, 3]

// concat
const a = [1, 2], b = [3, 4];
const c = a.concat(b);        // [1, 2, 3, 4]

// slice (non-destructive)
const sliced = c.slice(1, 3); // [2, 3]

// splice (destructive)
let nums = [1, 2, 3, 4];
nums.splice(1, 2);            // removes 2 elements at index 1 → [1, 4]

// indexOf & includes
const letters = ["a", "b", "c"];
console.log(letters.indexOf("b"));  // 1
console.log(letters.includes("d")); // false

// forEach
letters.forEach(letter => {
  console.log(letter); // prints each letter
});

// map
const squared = [1, 2, 3].map(n => n * n); // [1, 4, 9]
console.log(squared);

// filter
const ages = [10, 20, 30];
const adults = ages.filter(age => age >= 18); // [20, 30]
console.log(adults);

// reduce
const prices = [100, 200, 300];
const total = prices.reduce((sum, price) => sum + price, 0); // 600
console.log(total);
