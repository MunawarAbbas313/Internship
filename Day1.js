//1. Variable Declaration Rules (var, let, const)

// var → function-scoped, can be redclred again and again
var x = 10;
var x = 20;
console.log(x); // 20 

let y = 5;
// let y = 6; //  Error: Cannot re-declare

const z = 30;
// z = 40; //  Error: Assignment to constant variable
