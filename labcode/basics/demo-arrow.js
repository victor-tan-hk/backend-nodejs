// =====================================================
// Demonstration of Arrow Functions vs Traditional Functions
// =====================================================

//  Basic Function Returning a Value
//-----------------------------------------------------

// Traditional function declaration
function addTraditional(a, b) {
  return a + b;
};

// Equivalent arrow function (with implicit return)
const addArrow = (a, b) => a + b;

console.log("Basic Function :");
console.log("Traditional:", addTraditional(2, 3)); // 5
console.log("Arrow:", addArrow(2, 3));             // 5


// Single Parameter Function
//-----------------------------------------------------

// Traditional
function squareTraditional(x) {
  return x * x;
};

// Arrow function — parentheses can be omitted if only one parameter
const squareArrow = x => x * x;

console.log("Single Parameter:");
console.log("Traditional:", squareTraditional(4)); // 16
console.log("Arrow:", squareArrow(4));             // 16

// Traditional
function greetTraditional() {
  return "Hello!";
};

// Arrow function — must include empty parentheses
const greetArrow = () => "Hello!";

console.log("\nNo Parameters:");
console.log("Traditional:", greetTraditional()); // "Hello!"
console.log("Arrow:", greetArrow());             // "Hello!"


// Multi-line Function Body (Explicit return required)
//-----------------------------------------------------

// Traditional
function multiplyTraditional(a, b) {
  const result = a * b;
  return result;
};

// Arrow function — requires {} and explicit return
const multiplyArrow = (a, b) => {
  const result = a * b;
  return result;
};

console.log("\n Multi-line Function:");
console.log("Traditional:", multiplyTraditional(3, 4)); // 12
console.log("Arrow:", multiplyArrow(3, 4));             // 12


// Returning an Object Literal
//-----------------------------------------------------

// Traditional
function makePersonTraditional(name, age) {
  return { name: name, age: age };
};

// Arrow function — must wrap object in parentheses, otherwise JS
// thinks {} denotes a function body
const makePersonArrow = (name, age) => ({ name: name, age: age });

console.log("\nReturning an Object:");
console.log("Traditional:", makePersonTraditional("Alice", 25));
console.log("Arrow:", makePersonArrow("Alice", 25));


// Using 'this' in Methods — difference in behavior
//-----------------------------------------------------

const personTraditional = {
  name: "Bob",
  greet: function () {
    console.log("Traditional:", "Hello, my name is", this.name);
  }
};

const personArrow = {
  name: "Charlie",
  greet: () => {
    // Arrow functions do not have their own 'this'
    // 'this' here refers to the global object (undefined in strict mode)
    console.log("Arrow:", "Hello, my name is", this.name);
  }
};

console.log(" 'this' Behavior:");
personTraditional.greet(); // Works correctly → Bob
personArrow.greet();       // 'this.name' is undefined


// Common use cases for arrow functions in pure JavaScript

// Arrow Function in Array Methods
//-----------------------------------------------------

const numbers = [1, 2, 3, 4, 5];

// Traditional callback
const doubledTraditional = numbers.map(function (n) {
  return n * 2;
});

// Arrow callback — concise and cleaner
const doubledArrow = numbers.map(n => n * 2);

console.log("\n Array Method Callback:");
console.log("Traditional:", doubledTraditional); // [2, 4, 6, 8, 10]
console.log("Arrow:", doubledArrow);             // [2, 4, 6, 8, 10]


// Arrow Function with Rest Parameters (no 'arguments' object)
//-----------------------------------------------------

// Traditional function has access to the 'arguments' object
function showArgsTraditional() {
  console.log("Traditional arguments:", arguments);
}

// Arrow functions do NOT have 'arguments'; must use rest parameters instead
const showArgsArrow = (...args) => {
  console.log("Arrow args (via rest):", args);
};

console.log("\n arguments vs rest:");
showArgsTraditional(10, 20, 30);
showArgsArrow(10, 20, 30);



// =============================================
// Arrow Functions with setTimeout() and setInterval()
// =============================================

// Example 1: Using an arrow function with setTimeout()
// --------------------------------------------------------

// setTimeout() executes the given function ONCE after a delay (in milliseconds)
setTimeout(
  () => {
    console.log("setTimeout: This message appears after 5 seconds");
  }, 5000);


// Example 2 : Using an arrow function with setInterval()
// --------------------------------------------------------

// setInterval() executes the given function REPEATEDLY at fixed time intervals
let count = 0;

const timer = setInterval(
  () => {
    count++;
    console.log(`setInterval: Count = ${count}`);

    // Stop the interval after it runs 5 times
    if (count === 5) {
      clearInterval(timer);
      console.log("Interval stopped after 5 counts");
    }
  }, 1000); // run every 1 second

// ---------------------------------------------
// Notes:
// - Arrow functions make callbacks shorter and cleaner.
// - They automatically inherit 'this' from the outer scope,
//   which prevents common bugs when using setTimeout/setInterval
//   inside classes or objects.
// ---------------------------------------------
