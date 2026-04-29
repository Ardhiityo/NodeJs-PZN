import Redis from 'ioredis';

let redis = null;

beforeAll(async () => {
    redis = new Redis({
        host: '127.0.0.1',
        port: 6379,
        db: 0
    });
    redis.on('error', (err) => {
        //console.error('Redis Client Error:', err.message);
    });
    // Menunggu koneksi siap sebelum menjalankan test
    await new Promise((resolve) => {
        redis.on('ready', resolve);
    });
});

afterAll(async () => {
    try {
        await redis.quit();
    } catch (err) {
        await redis.disconnect();
    }
});

beforeEach(async () => {
    await redis.flushdb();
});

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

test('should can support geo point', async () => {
    await redis.geoadd('seller', 106.053875, -6.031233, 'Toko A');
    await redis.geoadd('seller', 106.054813, -6.030625, 'Toko B');

    const distance = await redis.geodist('seller', 'Toko A', 'Toko B')
    expect(distance).toBe('123.9380');

    const search = await redis.geosearch('seller', 'fromlonlat', 106.054349, -6.030929, 'byradius', 1, 'km');
    expect(search).toEqual(['Toko A', 'Toko B']);
    
    await redis.del('seller');
})

test('should can support hyper log log', async () => {
    await redis.pfadd('authors', ['Eko', 'Kurniawan', 'Khannedy']);
    await redis.pfadd('authors', ['Eko', 'Kurniawan', 'Khannedy']);
    await redis.pfadd('authors', ['Rully', 'Joko', 'Budi']);

    expect(await redis.pfcount('authors')).toBe(6);
    
    await redis.del('seller');
})