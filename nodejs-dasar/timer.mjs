import {
    setTimeout, setInterval
} from 'node:timers/promises';

console.log(new Date());

const res = await setTimeout(5000, 'Eko');

console.log(new Date());
console.log(res);

for await (const value of setInterval(2000, 'Khannedy')) {
    console.log(`Hello ${value} at ${new Date()}`);
}
