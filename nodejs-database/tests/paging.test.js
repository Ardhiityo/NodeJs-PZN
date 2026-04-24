import { prismaClient } from "../src/prisma-client";

beforeEach(async () => {
    await prismaClient.customer.deleteMany({});
});

test('paging test', async () => {
    await prismaClient.customer.createMany({
        data: [
            {
                name: 'Budi',
                email: 'budi@pzn.com',
                phone: '08123456789'
            },
            {
                name: 'Joko',
                email: 'joko@pzn.com',
                phone: '081123456789'
            },
            {
                name: 'Ujang',
                email: 'ujang@pzn.com',
                phone: '08211234567891'
            },
            {
                name: 'Hasan',
                email: 'hasan@pzn.com',
                phone: '082311234567892'
            }
        ]
    });

    const data = await prismaClient.customer.findMany({
        skip: 0,
        take: 2,
        orderBy: {
            id: 'asc'
        }
    });

    expect(data).toHaveLength(2);
    expect(data[0].name).toBe('Budi');
    expect(data[1].name).toBe('Joko');

    const data2 = await prismaClient.customer.findMany({
        skip: 2,
        take: 2,
        orderBy: {
            id: 'asc'
        }
    });

    expect(data2).toHaveLength(2);
    expect(data2[0].name).toBe('Ujang');
    expect(data2[1].name).toBe('Hasan');
});