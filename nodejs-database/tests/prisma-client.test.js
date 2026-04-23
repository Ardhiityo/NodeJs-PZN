import {prismaClient} from "../src/prisma-client";

test('prisma client test', async () => {
    await prismaClient.$connect();
    
    //do something here
    
    await prismaClient.$disconnect();
});

