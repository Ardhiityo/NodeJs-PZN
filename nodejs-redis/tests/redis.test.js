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