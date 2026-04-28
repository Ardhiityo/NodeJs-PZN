import request from 'supertest';
import { web } from '../src/app/web.js';
import prisma from '../src/app/database.js';
import bcrypt from 'bcrypt';

beforeEach(async () => {
    await prisma.address.deleteMany({});
    await prisma.contact.deleteMany({});
    await prisma.user.deleteMany({});
});

afterAll(async () => {
    await prisma.$disconnect();
});

test('create address success', async () => {
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
        .post(`/api/contacts/${contact.id}/addresses`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            street: "Jalan Jalan",
            city: "Jakarta",
            province: "DKI Jakarta",
            country: "Indonesia",
            postal_code: "12345"
        })
        .expect(201);

    expect(response.body.data.street).toBe('Jalan Jalan');
    expect(response.body.data.city).toBe('Jakarta');
    expect(response.body.data.province).toBe('DKI Jakarta');
    expect(response.body.data.country).toBe('Indonesia');
    expect(response.body.data.postal_code).toBe("12345");
});

test('create address with invalid input', async () => {
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
        .post(`/api/contacts/${contact.id}/addresses`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            street: "",
            city: "",
            province: "",
            country: "",
            postal_code: -1
        })
        .expect(400);

    expect(response.body.errors).toBeDefined();
});

test('get all addresses success', async () => {
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

    await prisma.address.create({
        data: {
            street: "Jalan Jalan",
            city: "Jakarta",
            province: "DKI Jakarta",
            country: "Indonesia",
            postal_code: "12345",
            contact_id: contact.id
        }
    });

    const response = await request(web)
        .get(`/api/contacts/${contact.id}/addresses`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].street).toBe('Jalan Jalan');
});

test('get address detail success', async () => {
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

    const address = await prisma.address.create({
        data: {
            street: "Jalan Jalan",
            city: "Jakarta",
            province: "DKI Jakarta",
            country: "Indonesia",
            postal_code: "12345",
            contact_id: contact.id
        }
    });

    const response = await request(web)
        .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data.street).toBe('Jalan Jalan');
});

test('get address detail not found', async () => {
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
        .get(`/api/contacts/${contact.id}/addresses/999`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(404);

    expect(response.body.errors).toBe("Address is not found");
});

test('update address success', async () => {
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

    const address = await prisma.address.create({
        data: {
            street: "Jalan Jalan",
            city: "Jakarta",
            province: "DKI Jakarta",
            country: "Indonesia",
            postal_code: "12345",
            contact_id: contact.id
        }
    });

    const response = await request(web)
        .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .set('Authorization', user.token)
        .send({
            street: "Jalan Updated",
            city: "Bandung",
            province: "Jawa Barat",
            country: "Indonesia",
            postal_code: "54321"
        })
        .expect(200);

    expect(response.body.data.street).toBe('Jalan Updated');
    expect(response.body.data.city).toBe('Bandung');
});

test('delete address success', async () => {
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

    const address = await prisma.address.create({
        data: {
            street: "Jalan Jalan",
            city: "Jakarta",
            province: "DKI Jakarta",
            country: "Indonesia",
            postal_code: "12345",
            contact_id: contact.id
        }
    });

    const response = await request(web)
        .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
        .expect(200);

    expect(response.body.data).toBe(true);

    const deletedAddress = await prisma.address.findUnique({
        where: {
            id: address.id
        }
    });

    expect(deletedAddress).toBeNull();
});

