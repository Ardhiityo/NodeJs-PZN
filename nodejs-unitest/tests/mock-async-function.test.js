import { getBalance } from "../src/async"

describe('mock async test', () => {
    it('should mock async', async () => {
        const callback = jest.fn();

        //jika dipanggil 2x maka return nya adalah undefined
        callback.mockResolvedValueOnce(150);

        const data = await getBalance('Joko', callback);

        await expect(data).toEqual({ name: 'Joko', balance: 150 });
        await expect(callback.mock.calls.length).toBe(1);
        await expect(callback.mock.results[0].value).resolves.toBe(150);
    });

    it('should mock async resolve', async () => {
        const callback = jest.fn();

        callback.mockResolvedValueOnce(150);

        await expect(getBalance('Joko', callback)).resolves.toEqual({ name: 'Joko', balance: 150 });
    });

    it('should mock async reject matchers', async () => {
        const callback = jest.fn();

        callback.mockRejectedValueOnce(new Error('Sample error'));

        await expect(getBalance('Joko', callback)).rejects.toThrow('Sample error');
    });

    it.failing('should mock async reject failing', async () => {
        const callback = jest.fn();

        callback.mockRejectedValueOnce(new Error('Sample error'));

        await getBalance('Joko', callback);
    });
});