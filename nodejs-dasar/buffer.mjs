import { Buffer } from 'node:buffer';

const buffer = Buffer.from("Hello Eko", 'utf-8');

console.log(buffer.toString());
console.log(buffer.toString('hex'));

const buffer2 = Buffer.from('48656c6c6f20456b6f', 'hex');
console.log(buffer2.toString());