import { sayHelloAsync } from '../src/async';

describe('concurrent', () => {
    it.concurrent('should do something', async () => {
        await expect(sayHelloAsync('Budi')).resolves.toBe('Hello Budi');
    });
    it.concurrent('should do something', async () => {
        await expect(sayHelloAsync('Budi')).resolves.toBe('Hello Budi');
    });
}); 