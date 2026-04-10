import { sayHelloAsync } from "../src/async.js";

test('test async await', async () => {
    const result = await sayHelloAsync('Eko');
    expect(result).toBe('Hello Eko');
});

test('test async promises', async () => {
    await expect(sayHelloAsync('Eko')).resolves.toBe('Hello Eko');
    await expect(sayHelloAsync()).rejects.toThrow('Name is required');
});