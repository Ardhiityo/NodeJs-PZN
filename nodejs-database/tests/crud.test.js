import { prismaClient } from "../src/prisma-client";

beforeEach(async () => {
    await prismaClient.customer.deleteMany({});
});

test('create', async () => {
    const customer = await prismaClient.customer.create({
        data: {
            name: 'Budi',
            email: 'budi@pzn.com',
            phone: '08123456789'
        }
    });

    expect(customer).toBeDefined();

    expect(customer.name).toBe('Budi');
    expect(customer.email).toBe('budi@pzn.com');
    expect(customer.phone).toBe('08123456789');
});

test('read', async () => {
    const insert = await prismaClient.customer.create({
        data: {
              name: 'Budi',
            email: 'budi@pzn.com',
            phone: '08123456789'
        }
    });

    const read = await prismaClient.customer.findUnique({
        where: {
            email: 'budi@pzn.com'
        }
    });

    expect(read).toBeDefined();

    expect(read.name).toBe(insert.name);
    expect(read.email).toBe(insert.email);
    expect(read.phone).toBe(insert.phone);
});

test('update', async () => {
    const insert = await prismaClient.customer.create({
        data: {
            name: 'Budi',
            email: 'budi@pzn.com',
            phone: '08123456789'
        }
    });

    const update = await prismaClient.customer.update({
        where: {
            email: insert.email
        },
        data: {
            name: 'Budi Update'
        }
    });

    expect(update.name).toBe('Budi Update');
});

test('delete', async () => {
    const insert = await prismaClient.customer.create({
        data: {
            name: 'Budi',
            email: 'budi@pzn.com',
            phone: '08123456789'
        }
    });

    const deleted = await prismaClient.customer.delete({
        where: {
            email: insert.email
        }
    });

    expect(deleted.name).toBe(insert.name);
    expect(deleted.email).toBe(insert.email);
    expect(deleted.phone).toBe(insert.phone);
});