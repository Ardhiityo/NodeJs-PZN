import { calculate, calculateAndReturn } from "../src/sum";

describe('mock function test', () => {
    it('with mock function', () => {
        const callback = jest.fn();
        calculate([10, 10, 10], callback);

        console.log(callback.mock.calls); //[ [ 30 ] ]

        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe(30);
    });

    it('without mock function', () => {
        const callback = jest.fn();

        calculate([10, 10, 10], function (value) {
            console.log(value);
        });
    });

    it('with mock return value', () => {
        const callback = jest.fn();

        //mockReturnValueOnce : apabila dipanggil lagi maka undefined
        //mockReturnValue : apabila dipanggil maka akan selalu mengembalikan value tersebut

        //apapun parameter nya akan mengembalikan nilai 12
        callback.mockReturnValueOnce(12);
        //apapun parameter nya akan mengembalikan nilai 15
        callback.mockReturnValueOnce(15);

        //apapun parameter nya akan mengembalikan nilai 300
        callback.mockReturnValue(300);

        //masuk ke mockReturnValueOnce
        expect(calculateAndReturn([10, 10], callback)).toBe(12);
        expect(calculateAndReturn([20, 10], callback)).toBe(15);

        //masuk ke mockReturnValue
        expect(calculateAndReturn([1, 1], callback)).toBe(300);
        expect(calculateAndReturn([1, 1], callback)).toBe(300);

        expect(callback.mock.results[0].value).toBe(12);
        expect(callback.mock.results[1].value).toBe(15);
    })

    it('with mock implementation', () => {
        const callback = jest.fn();

        //manipulasi nilai yang diberikan dari parameter
        callback.mockImplementation(value => value * 2);

        expect(calculateAndReturn([10, 10], callback)).toBe(40);
        expect(calculateAndReturn([5, 5], callback)).toBe(20);

        expect(callback.mock.results[0].value).toBe(40);
        expect(callback.mock.results[1].value).toBe(20);
    });
});