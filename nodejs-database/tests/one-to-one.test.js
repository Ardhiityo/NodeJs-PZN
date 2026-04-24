import { prismaClient } from "../src/prisma-client.js";

beforeEach(async () => {
    await prismaClient.wallet.deleteMany({});
    await prismaClient.customer.deleteMany({});
});

test('create wallet for customer', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789"
        }
    });

    const wallet = await prismaClient.wallet.create({
        data:
        {
            balance: 10000,
            customer_id: customer.id
        },
        include: {
            customer: true
        }
    });

    console.log(wallet);

    expect(wallet.balance).toBe(10000);
    expect(wallet.customer_id).toBe(customer.id);

    expect(wallet.customer.name).toBe('Budi');
    expect(wallet.customer.email).toBe('budi@pzn.com');
    expect(wallet.customer.phone).toBe('08123456789');
});

test('create customer with wallet', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789",
            wallet:
            {
                create:
                {
                    balance: 10000
                }
            }
        },
        include:
        {
            wallet: true
        }
    });

    console.log(customer);

    expect(customer.wallet.balance).toBe(10000);
    expect(customer.wallet.customer_id).toBe(customer.id);

    expect(customer.name).toBe('Budi');
    expect(customer.email).toBe('budi@pzn.com');
    expect(customer.phone).toBe('08123456789');
});

test('find wallet by customer id', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789",
            wallet:
            {
                create:
                {
                    balance: 10000
                }
            }
        }
    });

    const wallet = await prismaClient.wallet.findUnique({
        where:
        {
            customer_id: customer.id
        },
        include:
        {
            customer: true
        }
    });

    console.log(wallet);

    expect(wallet.balance).toBe(10000);
    expect(wallet.customer_id).toBe(customer.id);

    expect(wallet.customer.name).toBe(customer.name);
    expect(wallet.customer.email).toBe(customer.email);
    expect(wallet.customer.phone).toBe(customer.phone);
});

test('find wallet by customer', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789",
            wallet:
            {
                create:
                {
                    balance: 10000
                }
            }
        },
        include:
        {
            wallet: true
        }
    });

    const customers = await prismaClient.customer.findMany({
        where:
        {
            wallet:
            {
                isNot: null
            }
        },
        include:
        {
            wallet: true
        }
    });

    console.log(customers);

    expect(customers.length).toBe(1);
    expect(customers[0].name).toBe(customer.name);
    expect(customers[0].email).toBe(customer.email);
    expect(customers[0].phone).toBe(customer.phone);

     expect(customers[0].wallet.balance).toBe(customer.wallet.balance);
     expect(customers[0].wallet.customer_id).toBe(customer.id);
});