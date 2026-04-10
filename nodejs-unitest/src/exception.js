export class MyException extends Error { }

export function callMe(name) {
    if (name) {
        return `Hello ${name}`;
    }
    throw new MyException("Ups, ada error");
}