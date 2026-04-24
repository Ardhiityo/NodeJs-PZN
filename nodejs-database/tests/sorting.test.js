import { prismaClient } from "../src/prisma-client";

beforeEach(async () => {
    await prismaClient.customer.deleteMany({});
});

test('sorting test', async () => {
    await prismaClient.customer.createMany({
        data: [
            {
                name: 'Budi 1',
                email: 'budi1@pzn.com',
                phone: '08123456789'
            },
            {
                name: 'Budi 2',
                email: 'budi2@pzn.com',
                phone: '081123456789'
            },
            {
                name: 'Budi 3',
                email: 'budi3@pzn.com',
                phone: '08211234567891'
            },
            {
                name: 'Budi 4',
                email: 'budi4@pzn.com',
                phone: '082311234567892'
            }
        ]
    });

    const data = await prismaClient.customer.findMany({
        take: 10,
        orderBy: [
            {
                email: 'asc'
            },
            {
                name: 'desc'
            },
        ]
    });

    expect(data[0].name).toBe('Budi 1');
    expect(data[0].email).toBe('budi1@pzn.com');
    expect(data[1].name).toBe('Budi 2');
    expect(data[1].email).toBe('budi2@pzn.com');
    expect(data[2].name).toBe('Budi 3');
    expect(data[2].email).toBe('budi3@pzn.com');
    expect(data[3].name).toBe('Budi 4');
    expect(data[3].email).toBe('budi4@pzn.com');
});