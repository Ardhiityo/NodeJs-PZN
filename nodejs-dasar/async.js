//Versi Node.js: Node.js v14.8+ mendukung top-level await

function sayHello() {
    return Promise.resolve("Hello World");
}

const result = await sayHello();
console.log(result);