import { sum } from "../src/sum";

describe('when sum 10 and 20', () => {
    it('should return 30', () => {
        expect(sum(10, 20)).toBe(30);
    });
});