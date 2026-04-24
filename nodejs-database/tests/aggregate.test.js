import { prismaClient } from "../src/prisma-client";

beforeEach(async () => {
    await prismaClient.product.deleteMany({});
});

test('aggregate min max sum count test', async () => {
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

    const summary = await prismaClient.product.aggregate({
        _sum: {
            price: true,
            stock: true
        },
        _avg: {
            price: true,
            stock: true
        },
        _max: {
            price: true,
            stock: true
        },
        _min: {
            price: true,
            stock: true
        },
        _count: {
            id: true
        }
    });

    expect(summary).toStrictEqual({
        _sum: {
            price: 100000 + 20000 + 30000 + 40000,
            stock: 100 + 200 + 300 + 400
        },
        _avg: {
            price: (100000 + 20000 + 30000 + 40000) / 4,
            stock: (100 + 200 + 300 + 400) / 4
        },
        _max: {
            price: Math.max(100000, 20000, 30000, 40000),
            stock: Math.max(100, 200, 300, 400)
        },
        _min: {
            price: Math.min(100000, 20000, 30000, 40000),
            stock: Math.min(100, 200, 300, 400)
        },
        _count: {
            id: 4
        }
    });
});

test('aggregate groupBy test', async () => {
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

    const summary = await prismaClient.product.groupBy({
        by: ['category'],
        _sum: {
            stock: true
        },
        orderBy: {
            _sum: {
                stock: 'asc'
            }
        }
    });

    console.log(summary);

    for (const result of summary) {
        expect(result).toHaveProperty('category');
        expect(result).toHaveProperty('_sum');
    }

    expect(summary[0].category).toBe('Electronics');
    expect(summary[0]._sum.stock).toBe(400);

    expect(summary[1].category).toBe('Food');
    expect(summary[1]._sum.stock).toBe(600);
});

test('aggregate having test', async () => {
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

    const summary = await prismaClient.product.groupBy({
        by: ['category'],
        _sum: {
            stock: true
        },
        orderBy: {
            _sum: {
                stock: 'asc'
            }
        },
        having: {
            stock: {
                _sum: {
                    gte: 500
                }
            }
        }
    });

    console.log(summary);
    
    for (const result of summary) {
        expect(result).toHaveProperty('category');
        expect(result).toHaveProperty('_sum');
    }

    expect(summary.length).toBe(1);
    
    expect(summary[0].category).toBe('Food');
    expect(summary[0]._sum.stock).toBe(600);
});