import request from 'supertest';
import { web } from '../src/app/web.js';
import prisma from '../src/app/database.js';
import bcrypt from 'bcrypt';

beforeEach(async () => {
    await prisma.contact.deleteMany({});
    await prisma.user.deleteMany({});
});

afterAll(async () => {
    await prisma.$disconnect();
});

test('create contact success', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const response = await request(web)
        .post('/api/contacts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890"
        })

    expect(response.body.data.first_name).toBe('John');
    expect(response.body.data.last_name).toBe('Doe');
    expect(response.body.data.email).toBe('john@example.com');
    expect(response.body.data.phone).toBe('081234567890');
});

test('create contact with invalid email', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const response = await request(web)
        .post('/api/contacts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            first_name: "John",
            last_name: "Doe",
            email: "invalid-email",
            phone: "081234567890"
        })
        .expect(400);

    expect(response.body.errors).toBeDefined();
});

test('create contact without first name', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const response = await request(web)
        .post('/api/contacts')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890"
        })
        .expect(400);

    expect(response.body.errors.first_name).toBeDefined();
});

test('get all contacts success', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    await prisma.contact.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890",
            user_id: user.id
        }
    });

    const response = await request(web)
        .get('/api/contacts')
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data).toBeDefined();
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1);
});

test('get contact detail success', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const contact = await prisma.contact.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890",
            user_id: user.id
        }
    });

    const response = await request(web)
        .get(`/api/contacts/${contact.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data.first_name).toBe('John');
    expect(response.body.data.last_name).toBe('Doe');
    expect(response.body.data.email).toBe('john@example.com');
    expect(response.body.data.phone).toBe('081234567890');
});

test('delete contact success', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const contact = await prisma.contact.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890",
            user_id: user.id
        }
    });

    const response = await request(web)
        .delete(`/api/contacts/${contact.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data).toBe(true);

    const deletedContact = await prisma.contact.findUnique({
        where: {
            id: contact.id
        }
    });

    expect(deletedContact).toBeNull();
});

test('get contact detail not found', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const response = await request(web)
        .get(`/api/contacts/999`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(404);

    expect(response.body.errors).toBe("Contact is not found");
});

test('delete contact not found', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const response = await request(web)
        .delete(`/api/contacts/999`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(404);

    expect(response.body.errors).toBe("Contact is not found");
});

test('update contact success', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const contact = await prisma.contact.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890",
            user_id: user.id
        }
    });

    const response = await request(web)
        .put(`/api/contacts/${contact.id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            first_name: "John Updated",
            last_name: "Doe Updated",
            email: "john.updated@example.com",
            phone: "081234567891"
        })
        .expect(200);

    expect(response.body.data.first_name).toBe('John Updated');
    expect(response.body.data.last_name).toBe('Doe Updated');
    expect(response.body.data.email).toBe('john.updated@example.com');
    expect(response.body.data.phone).toBe('081234567891');
});

test('update contact not found', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    const response = await request(web)
        .patch(`/api/contacts/999`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            first_name: "John Updated",
            last_name: "Doe Updated",
            email: "john.updated@example.com",
            phone: "081234567891"
        })
        .expect(404);
});

test('search contact by name', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    await prisma.contact.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890",
            user_id: user.id
        }
    });

    const response = await request(web)
        .get('/api/contacts')
        .query({ name: 'John' })
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(response.body.paging).toBeDefined();
    expect(response.body.paging.page).toBe(1);
    expect(response.body.paging.total_page).toBe(1);
    expect(response.body.paging.total_item).toBe(1);
    expect(response.body.data[0].first_name).toBe('John');
});

test('search contact by email', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    await prisma.contact.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890",
            user_id: user.id
        }
    });

    const response = await request(web)
        .get('/api/contacts')
        .query({ email: 'john@example.com' })
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].email).toBe('john@example.com');
});

test('search contact by phone', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    await prisma.contact.create({
        data: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            phone: "081234567890",
            user_id: user.id
        }
    });

    const response = await request(web)
        .get('/api/contacts')
        .query({ phone: '081234567890' })
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].phone).toBe('081234567890');
});

test('search contact with paging', async () => {
    const user = await prisma.user.create({
        data: {
            name: "John Doe",
            username: "johndoe",
            password: await bcrypt.hash("@Secret123", 10),
            token: "123456789"
        }
    });

    for (let i = 0; i < 15; i++) {
        await prisma.contact.create({
            data: {
                first_name: `John ${i}`,
                last_name: `Doe ${i}`,
                email: `john${i}@example.com`,
                phone: `0812345678${i}`,
                user_id: user.id
            }
        });
    }

    const responsePage1 = await request(web)
        .get('/api/contacts')
        .query({ page: 1, size: 10 })
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(responsePage1.body.data.length).toBe(10);

    const responsePage2 = await request(web)
        .get('/api/contacts')
        .query({ page: 2, size: 10 })
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(responsePage2.body.data.length).toBe(5);
    expect(responsePage2.body.paging.total_item).toBe(15);
    expect(responsePage2.body.paging.page).toBe(2);
    expect(responsePage2.body.paging.total_page).toBe(2);
});