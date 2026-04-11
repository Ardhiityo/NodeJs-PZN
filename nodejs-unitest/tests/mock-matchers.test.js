import { calculate } from "../src/sum";

describe('Mock matchers test', () => {
    it('should mock matchers has been called', () => {
        const callback = jest.fn();

        calculate([1, 2, 3, 4, 5], callback);

        expect(callback).toHaveBeenCalled();
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(15);
    })
});