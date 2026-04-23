import {prismaClient} from "../src/prisma-client.js";

test('execute sql', async () => {
    const email = 'eko@gmail.com';
    const name = 'Eko';

    const result = await prismaClient.$executeRaw`INSERT INTO user(email, name) VALUES (${email}, ${name});`;
    
    expect(result).toBe(1);
});