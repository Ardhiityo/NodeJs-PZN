import { sum } from "../src/sum.js";

test('sum should return the sum of two numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
});