// = (Assignment Operator)
let x = 10; // assigns value 10 to x
let y = '10'; // assigns string "10" to y

// == (Loose Equality) - Compares value only after converting types if necessary
console.log(x == y); // true → JS converts string "10" to number 10, so 10 == 10

// === (Strict Equality) - Compares both value AND type
console.log(x === y); // false → x is number, y is string

// != (Loose Inequality) - Not equal after type coercion
console.log(x != y); // false → again, "10" becomes 10, so x == y is true → != gives false

// !== (Strict Inequality) - Not equal in value OR type
console.log(x !== y); // true → types are different (number vs string)

// ----------------------------------------------

// Booleans and Numbers
console.log(true == 1);   // true → true is converted to 1
console.log(true === 1);  // false → different types

console.log(false == 0);  // true → false becomes 0
console.log(false === 0); // false → different types

// Strings and Booleans
console.log('1' == true);   // true → '1' becomes number 1, true becomes 1
console.log('1' === true);  // false → different types

// Null and Undefined
console.log(null == undefined);  // true → loosely equal
console.log(null === undefined); // false → different types

// 0 and false
console.log(0 == false);   // true → false is coerced to 0
console.log(0 === false);  // false → different types

// Empty string and 0
console.log('' == 0);      // true → '' becomes 0
console.log('' === 0);     // false → string vs number

// NaN comparisons (special case)
let num = NaN;
console.log(num == NaN);   // false → NaN is NEVER equal to anything, even itself
console.log(num === NaN);  // false
console.log(Number.isNaN(num)); // true → correct way to check for NaN

// Object vs Object
let obj1 = { a: 1 };
let obj2 = { a: 1 };
let obj3 = obj1;

console.log(obj1 == obj2);  // false → different memory references
console.log(obj1 === obj2); // false
console.log(obj1 === obj3); // true → same reference
