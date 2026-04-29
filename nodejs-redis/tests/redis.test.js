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

    await redis.del('name');
})

test('should can support set', async () => {
    //set hanya menyimpan data dengan key unique
    await redis.sadd('names', 'Eko');
    await redis.sadd('names', 'Eko');
    await redis.sadd('names', 'Kurniawan');
    await redis.sadd('names', 'Kurniawan');
    await redis.sadd('names', 'Khannedy');
    await redis.sadd('names', 'Khannedy');

    let names = await redis.scard('names');
    expect(names).toBe(3);

    names = await redis.smembers('names');

    expect(names).toEqual(expect.arrayContaining(['Eko', 'Kurniawan', 'Khannedy']));

    await redis.del('name');
})

test('should can support sorted set', async () => {
    await redis.zadd('names', 100, 'Eko');
    await redis.zadd('names', 85, 'Joko');
    await redis.zadd('names', 95, 'Budi');

    let names = await redis.zcard('names');
    expect(names).toBe(3);

    names = await redis.zrange('names', 0, -1);
    expect(names).toEqual(['Joko', 'Budi', 'Eko']);

    expect(await redis.zpopmax('names')).toEqual(['Eko', '100']);
    expect(await redis.zpopmax('names')).toEqual(['Budi', '95']);
    expect(await redis.zpopmax('names')).toEqual(['Joko', '85']);

    await redis.del('names');
})

test('should can support hash', async () => {
    await redis.hset('user:1', {
        name: 'Eko',
        age: 30,
        country: 'Indonesia'
    });

    expect(await redis.hgetall('user:1')).toEqual({
        name: 'Eko',
        age: '30',
        country: 'Indonesia'
    });

    await redis.del('user:1');
})