import { sayHelloAsync } from "../src/async";

describe('Failing Test', () => {
    //cara 1
    it('should fail matchers', async () => {
        await expect(sayHelloAsync()).rejects.toThrow('Name is required');
    });

    //cara 2
    it.failing('should fail it.failing', async () => {
        await sayHelloAsync();
    });
});
