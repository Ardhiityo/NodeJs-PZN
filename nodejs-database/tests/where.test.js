import { prismaClient } from "../src/prisma-client.js";

beforeEach(async () => {
    await prismaClient.product.deleteMany({});
});

test('where test', async () => {
    await prismaClient.product.createMany({
        data: [
            {
                name: 'Samsung Fold',
                category: 'Electronics',
                price: 100000,
                stock: 100
            },
            {
                name: 'Pizza',
                category: 'Food',
                price: 20000,
                stock: 200
            },
            {
                name: 'Iphone 13',
                category: 'Electronics',
                price: 30000,
                stock: 300
            },
            {
                name: 'Cake',
                category: 'Food',
                price: 40000,
                stock: 400
            }
        ]
    });

    const summary = await prismaClient.product.findMany({
        where: {
            stock: {
                lt: 300
            }
        },
        orderBy: {
            stock: 'asc'
        }
    });

    console.log(summary);

    expect(summary.length).toBe(2);

    expect(summary[0].name).toBe('Samsung Fold');
    expect(summary[0].stock).toBe(100);

    expect(summary[1].name).toBe('Pizza');
    expect(summary[1].stock).toBe(200);
});

test('where search', async () => {
    await prismaClient.product.createMany({
        data: [
            {
                name: 'Samsung Fold',
                category: 'Electronics',
                price: 100000,
                stock: 100
            },
            {
                name: 'Pizza',
                category: 'Food',
                price: 20000,
                stock: 200
            },
            {
                name: 'Iphone 13',
                category: 'Electronics',
                price: 30000,
                stock: 300
            },
            {
                name: 'Cake',
                category: 'Food',
                price: 40000,
                stock: 400
            },
            {
                name: 'Pepsi',
                category: 'Beverage',
                price: 2000,
                stock: 1000
            }
        ]
    });

    const summary = await prismaClient.product.findMany({
        where: {
            OR: [
                {
                    category: 'Food',
                },
                {
                    category: 'Beverage'
                }
            ]
        },
        orderBy: {
            category: 'asc'
        }
    });

    console.log(summary);

    expect(summary.length).toBe(3);

    expect(summary[0].name).toBe('Pepsi');
    expect(summary[0].stock).toBe(1000);

    expect(summary[1].name).toBe('Pizza');
    expect(summary[1].stock).toBe(200);

    expect(summary[2].name).toBe('Cake');
    expect(summary[2].stock).toBe(400);
});