import { prismaClient } from "../src/prisma-client.js";

beforeEach(async () => {
    await prismaClient.customer.deleteMany({});
});

test('sequential transaction', async () => {
    const [eko, budi] = await prismaClient.$transaction([
        prismaClient.customer.create({
            data: {
                name: 'Eko',
                email: 'eko@pzn.com',
                phone: '08123456789'
            }
        }),
        prismaClient.customer.create({
            data: {
                name: 'Budi',
                email: 'budi@pzn.com',
                phone: '08123456782'
            }
        })
    ]);

    expect(eko.name).toBe('Eko');
    expect(budi.name).toBe('Budi');
});

test('interactive transaction', async () => {
    const [eko, budi] = await prismaClient.$transaction(async (prisma) => {
        const eko = await prisma.customer.create({
            data: {
                name: 'Eko',
                email: 'eko@pzn.com',
                phone: '08123456789'
            }
        });
        
        const budi = await prisma.customer.create({
            data: {
                name: 'Budi',
                email: 'budi@pzn.com',
                phone: '08123456782'
            }
        });

        return [eko, budi];
    });

    expect(eko.name).toBe('Eko');
    expect(budi.name).toBe('Budi');
});