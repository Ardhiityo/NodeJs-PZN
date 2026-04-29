import Redis from 'ioredis';

let redis = null;

beforeEach(async () => {
    redis = new Redis({
        host: 'localhost',
        port: 6379,
        db: 0
    });
});

afterEach(async () => {
    await redis.quit();
})

test('should can ping', async () => {
    const response = await redis.ping();
    expect(response).toBe('PONG');
})

test('should can support string', async () => {
    await redis.setex('name', 2, 'Eko');

    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = await redis.get('name');

    expect(result).toBeNull();
})