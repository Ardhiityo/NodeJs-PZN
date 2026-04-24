import { prismaClient } from "../src/prisma-client";

beforeEach(async () => {
    await prismaClient.customer.deleteMany({});
});

test('select test', async () => {
    const data = await prismaClient.customer.create({
        data: {
            name: 'Budi 1',
            email: 'budi1@pzn.com',
            phone: '08123456789'
            },
        select: {
            name: true,
            email: true
        }
    });

    expect(data.name).toBeDefined();
    expect(data.email).toBeDefined();
    expect(data.phone).toBeUndefined();
    expect(data.id).toBeUndefined();
});

test('select many test', async () => {
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
        select: {
            name: true,
            email: true
        },
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

    data.forEach((customer) => {
        expect(customer.name).toBeDefined();
        expect(customer.email).toBeDefined();
        expect(customer.phone).toBeUndefined();
        expect(customer.id).toBeUndefined();
    })
});