import { prismaClient } from "../src/prisma-client.js";

beforeEach(async () => {
    await prismaClient.like.deleteMany({});
    await prismaClient.product.deleteMany({});
    await prismaClient.customer.deleteMany({});
});

test('create likes', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789"
        }
    });

    const product = await prismaClient.product.create({
        data:
        {
            name: "Product 1",
            price: 1000,
            stock: 10,
            category: "Electronics"
        }
    });

    const like = await prismaClient.like.create({
        data:
        {
            product_id: product.id,
            customer_id: customer.id
        },
        include: {
            customer: true,
            product: true
        }
    });

    console.log(like);

    expect(like.product_id).toBe(product.id);
    expect(like.customer_id).toBe(customer.id);

    expect(like.product.name).toBe(product.name);
    expect(like.product.price).toBe(product.price);
    expect(like.product.stock).toBe(product.stock);
    expect(like.product.category).toBe(product.category);

    expect(like.customer.name).toBe(customer.name);
    expect(like.customer.email).toBe(customer.email);
    expect(like.customer.phone).toBe(customer.phone);
});

test('find product with includes', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789"
        }
    });

    const product = await prismaClient.product.create({
        data:
        {
            name: "Product 1",
            price: 1000,
            stock: 10,
            category: "Electronics"
        }
    });

    await prismaClient.like.create({
        data:
        {
            product_id: product.id,
            customer_id: customer.id
        },
        include: {
            customer: true,
            product: true
        }
    });

    const customerLikesProduct = await prismaClient.customer.findUnique({
        where: {
            id: customer.id
        },
        include: {
            likedProducts: {
                include: {
                    product: true
                }
            }
        }
    });

    console.log(customerLikesProduct);

    expect(customerLikesProduct.likedProducts).toHaveLength(1);

    expect(customerLikesProduct.likedProducts[0].product.name).toBe(product.name);
    expect(customerLikesProduct.likedProducts[0].product.price).toBe(product.price);
    expect(customerLikesProduct.likedProducts[0].product.stock).toBe(product.stock);
    expect(customerLikesProduct.likedProducts[0].product.category).toBe(product.category);
});

test('find many product with includes', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789"
        }
    });

    const product = await prismaClient.product.create({
        data:
        {
            name: "Product 1",
            price: 1000,
            stock: 10,
            category: "Electronics"
        }
    });

    await prismaClient.like.create({
        data:
        {
            product_id: product.id,
            customer_id: customer.id
        },
        include: {
            customer: true,
            product: true
        }
    });

    const customerLikesProduct = await prismaClient.customer.findMany({
        where: {
            likedProducts: {
                some: {
                    product: {
                        name: {
                            contains: "1"
                        }
                    }
                }
            }
        },
        include: {
            likedProducts: {
                include: {
                    product: true
                }
            }
        }
    });

    expect(customerLikesProduct[0].likedProducts).toHaveLength(1);

    expect(customerLikesProduct[0].likedProducts[0].product.name).toBe(product.name);
    expect(customerLikesProduct[0].likedProducts[0].product.price).toBe(product.price);
    expect(customerLikesProduct[0].likedProducts[0].product.stock).toBe(product.stock);
    expect(customerLikesProduct[0].likedProducts[0].product.category).toBe(product.category);
});

test('create implicit relation', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789"
        }
    });

    const product = await prismaClient.product.create({
        data:
        {
            name: "Product 1",
            price: 1000,
            stock: 10,
            category: "Electronics"
        }
    });

    await prismaClient.customer.update({
        where: {
            id: customer.id
        },
        data:
        {
            lovedProducts: {
                connect: {
                    id: product.id
                }
            }
        }
    });

    const customerLikesProduct = await prismaClient.customer.findUnique({
        where: {
            id: customer.id
        },
        include: {
            lovedProducts: true
        }
    });

    console.log(customerLikesProduct);

    expect(customerLikesProduct.lovedProducts).toHaveLength(1);

    expect(customerLikesProduct.lovedProducts[0].name).toBe(product.name);
    expect(customerLikesProduct.lovedProducts[0].price).toBe(product.price);
    expect(customerLikesProduct.lovedProducts[0].stock).toBe(product.stock);
    expect(customerLikesProduct.lovedProducts[0].category).toBe(product.category);
});

test('find many implicit relation', async () => {
    const customer = await prismaClient.customer.create({
        data:
        {
            name: "Budi",
            email: "budi@pzn.com",
            phone: "08123456789"
        }
    });

    const product = await prismaClient.product.create({
        data:
        {
            name: "Product 1",
            price: 1000,
            stock: 10,
            category: "Electronics"
        }
    });

    await prismaClient.customer.update({
        where: {
            id: customer.id
        },
        data:
        {
            lovedProducts: {
                connect: {
                    id: product.id
                }
            }
        }
    });

    const customerLikesProduct = await prismaClient.customer.findMany({
        where: {
            lovedProducts: {
                some: {
                    name: {
                        contains: "1"
                    }
                }
            }
        },
        include: {
            lovedProducts: true
        }
    });

    expect(customerLikesProduct[0].lovedProducts).toHaveLength(1);

    expect(customerLikesProduct[0].lovedProducts[0].name).toBe(product.name);
    expect(customerLikesProduct[0].lovedProducts[0].price).toBe(product.price);
    expect(customerLikesProduct[0].lovedProducts[0].stock).toBe(product.stock);
    expect(customerLikesProduct[0].lovedProducts[0].category).toBe(product.category);
});