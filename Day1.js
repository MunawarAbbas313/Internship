//1. Variable Declaration Rules (var, let, const)

// var → function-scoped, can be redclred again and again
var x = 10;
var x = 20;
console.log(x); // 20 

let y = 5;
// let y = 6; //  Error: Cannot re-declare

const z = 30;
// z = 40; //  Error: Assignment to constant variable



//2.hoisting 
console.log(a); // undefined (hoisted)
var a = 10;

console.log(b); //  ReferenceError (not hoisted like var)
let b = 20;


//3. Scope
function testScope() {
  var a = 1;      // function-scoped
  let b = 2;      // block-scoped
  const c = 3;    // block-scoped

  if (true) {
    var a = 10;   // same variable
    let b = 20;   // new block variable
    const c = 30; // new block variable
    console.log(a, b, c); // 10, 20, 30
  }

  console.log(a); // 10 (var affected)
  console.log(b); // 2 (let not affected)
  console.log(c); // 3 (const not affected)
}
testScope();
