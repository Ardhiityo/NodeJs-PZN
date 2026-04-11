import { sum } from '../src/sum';

describe('each array', () => {
    it.each([
        [1, 2, 3],
        [4, 5, 9],
        [7, 8, 15],
    ])('should do something with %i and %i equals %i', (a, b, expected) => {
        expect(sum(a, b)).toBe(expected);
    });
});