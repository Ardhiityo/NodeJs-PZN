import { prismaClient } from "../src/prisma-client";

beforeEach(async () => {
    await prismaClient.customer.deleteMany({});
});

test('count', async () => {
    await prismaClient.customer.create({
        data: {
            name: 'Budi',
            email: 'budi@pzn.com',
            phone: '08123456789'
        }
    });

    const count = await prismaClient.customer.count({
        where: {
            name: 'Budi'
        }
    });
    
    expect(count).toBe(1);
});