import {prismaClient} from "../src/prisma-client.js";

beforeEach(async () => {
    await prismaClient.user.deleteMany({});
});

test('execute sql', async () => {
    const email = 'eko@gmail.com';
    const name = 'Eko';

    const result = await prismaClient.$executeRaw`INSERT INTO users(email, name) VALUES (${email}, ${name});`;
    
    expect(result).toBe(1);
});