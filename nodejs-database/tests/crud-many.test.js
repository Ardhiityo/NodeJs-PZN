import { prismaClient } from "../src/prisma-client";

beforeEach(async () => {
    await prismaClient.customer.deleteMany({});
});

test('create', async () => {
    const { count } = await prismaClient.customer.createMany({
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
            }
        ]
    });

    expect(count).toBeDefined();

    expect(count).toBe(2);
});

test('read', async () => {
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
            }
        ]
    });

    const read = await prismaClient.customer.findMany();

    expect(read).toBeDefined();

    expect(read.length).toBe(2);
});

test('update', async () => {
    const insert = await prismaClient.customer.createMany({
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
            }
        ]
    });

    const { count } = await prismaClient.customer.updateMany({
        where: {
            name: 'Budi'
        },
        data: {
            name: 'Budi Update'
        }
    });

    expect(count).toBe(1);
});

test('delete', async () => {
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
            }
        ]
    });

    const { count } = await prismaClient.customer.deleteMany({});

    expect(count).toBe(2);
});