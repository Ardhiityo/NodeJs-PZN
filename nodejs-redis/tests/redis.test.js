import Redis from 'ioredis';

let redis = null;

beforeEach(async () => {
    redis = new Redis({
        host: 'localhost',
        port: 6379,
        db: 0
    });
    await redis.flushdb();
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

test('should can support list', async () => {
    await redis.rpush('name', 'Eko');
    await redis.rpush('name', 'Kurniawan');
    await redis.rpush('name', 'Khannedy');

    const name = await redis.lrange('name', 0, -1);
    expect(name).toEqual(['Eko', 'Kurniawan', 'Khannedy']);

    expect(await redis.lpop('name')).toBe('Eko');
    expect(await redis.rpop('name')).toBe('Khannedy');

    expect(await redis.llen('name')).toBe(1);

    redis.del('name');
})