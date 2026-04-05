import { EventEmitter } from "node:events";

const eventEmitter = new EventEmitter();

eventEmitter.addListener("greet", (name) => {
    console.log(`Hello ${name}`);
});

eventEmitter.emit("greet", "Eko");