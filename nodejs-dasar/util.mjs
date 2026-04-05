import { format } from 'node:util';

const name = 'Budi';
const age = 30;

const result = format('Hello %s, you are %d years old', name, age);
console.log(result);

const person = {
    name: 'Budi',
    age: 30
};

const result2 = format('Hello %j, you are %d years old', person, age);
console.log(result2);