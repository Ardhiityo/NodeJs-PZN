import {prismaClient} from "../src/prisma-client.js";

test('execute sql', async () => {
    const result = await prismaClient.$queryRaw`SELECT * FROM user LIMIT 1`;
    
    expect(result.length).toBe(1);
    
    for (const user of result) {
        console.log(`Email: ${user.email}, Name: ${user.name},`);
    }
});