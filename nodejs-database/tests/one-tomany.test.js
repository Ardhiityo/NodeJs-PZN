import { prismaClient } from "../src/prisma-client.js";

beforeEach(async () => {
    await prismaClient.comment.deleteMany({});
    await prismaClient.customer.deleteMany({});
});

test('create comment for customer', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789"
        }
    });

    const comment = await prismaClient.comment.create({
        data:
        {
            title: "Komentar 1",
            description: "Ini adalah komentar pertama",
            customer_id: customer.id
        },
        include: {
            customer: true
        }
    });

    console.log(comment);

    expect(comment.title).toBe('Komentar 1');
    expect(comment.description).toBe('Ini adalah komentar pertama');
    expect(comment.customer_id).toBe(customer.id);

    expect(comment.customer.name).toBe(customer.name);
    expect(comment.customer.email).toBe(customer.email);
    expect(comment.customer.phone).toBe(customer.phone);
});

test('create customer with many comments', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789",
            comment:
            {
                create:
                    [
                        {
                            title: "Komentar 1",
                            description: "Ini adalah komentar pertama"
                        },
                        {
                            title: "Komentar 2",
                            description: "Ini adalah komentar kedua"
                        }
                    ]
            }
        },
        include:
        {
            comment: true
        }
    });

    console.log(customer);

    expect(customer.comment.length).toBe(2);
    expect(customer.comment[0].title).toBe('Komentar 1');
    expect(customer.comment[0].description).toBe('Ini adalah komentar pertama');
    expect(customer.comment[0].customer_id).toBe(customer.id);
    expect(customer.comment[1].title).toBe('Komentar 2');
    expect(customer.comment[1].description).toBe('Ini adalah komentar kedua');
    expect(customer.comment[1].customer_id).toBe(customer.id);
});

test('select customer by relation', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789",
            comment:
            {
                create:
                    [
                        {
                            title: "Komentar 1",
                            description: "Ini adalah komentar pertama"
                        },
                        {
                            title: "Komentar 2",
                            description: "Ini adalah komentar kedua"
                        }
                    ]
            }
        }
    });

    const customers = await prismaClient.customer.findMany({
        where:
        {
            comment:
            {
                some: {
                    title: {
                        contains: 'Komentar'
                    }
                }
            }
        },
        include:
        {
            comment: true
        }
    });

    console.log(customers);

    expect(customers[0].comment.length).toBe(2);

    expect(customers[0].comment[0].title).toBe('Komentar 1');
    expect(customers[0].comment[0].description).toBe('Ini adalah komentar pertama');
    expect(customers[0].comment[0].customer_id).toBe(customer.id);

    expect(customers[0].comment[1].title).toBe('Komentar 2');
    expect(customers[0].comment[1].description).toBe('Ini adalah komentar kedua');
    expect(customers[0].comment[1].customer_id).toBe(customer.id);
});
