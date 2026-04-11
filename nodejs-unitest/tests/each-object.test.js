import { sum } from '../src/sum';

describe('each object', () => {
    it.each([
        { a: 1, b: 2, expected: 3 },
        { a: 4, b: 5, expected: 9 },
        { a: 7, b: 8, expected: 15 },
    ])('should do something with $a and $b equals $expected', ({ a, b, expected }) => {
        expect(sum(a, b)).toBe(expected);
    });
});