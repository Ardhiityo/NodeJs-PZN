import request from 'supertest';
import { web } from '../src/app/web.js';
import prisma from '../src/app/database.js';
import bcrypt from 'bcrypt';

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test('register user test', async () => {
  const response = await request(web)
    .post('/api/users')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      name: "John Doe",
      username: "johndoe",
      password: "@Secret123"
    })
    .expect(201);

  expect(response.body.data.name).toBe('John Doe');
  expect(response.body.data.username).toBe('johndoe');
  expect(response.body.data.token).toBeDefined();
})

test('register user with duplicate username test', async () => {
  await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: await bcrypt.hash("@Secret123", 10)
    }
  });

  const response = await request(web)
    .post('/api/users')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      name: "John Doe",
      username: "johndoe",
      password: "@Secret123"
    })
    .expect(400);

  expect(response.body.errors.username).toContain("Username already exists");
})

test('login user test', async () => {
  await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: await bcrypt.hash("@Secret123", 10)
    }
  });

  const response = await request(web)
    .post('/api/users/login')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      username: "johndoe",
      password: "@Secret123"
    })
    .expect(200);

  expect(response.body.data.id).toBeDefined();
  expect(response.body.data.name).toBe('John Doe');
  expect(response.body.data.username).toBe('johndoe');
  expect(response.body.data.token).toBeDefined();
})

test('logout user test', async () => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: await bcrypt.hash("@Secret123", 10),
      token: "123456789"
    }
  });

  const response = await request(web)
    .delete('/api/users/logout')
    .set('Accept', 'application/json')
    .set('Authorization', user.token)
    .expect(200);

  expect(response.body.data).toBe(true);
})

test('get current user test', async () => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: await bcrypt.hash("@Secret123", 10),
      token: "123456789"
    }
  });

  const response = await request(web)
    .get('/api/users/current')
    .set('Accept', 'application/json')
    .set('Authorization', user.token)
    .expect(200);

  expect(response.body.data.id).toBeDefined();
  expect(response.body.data.name).toBe('John Doe');
  expect(response.body.data.username).toBe('johndoe');
});

test('update user test', async () => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      username: "johndoe",
      password: await bcrypt.hash("@Secret123", 10),
      token: "123456789"
    }
  });

  const response = await request(web)
    .patch('/api/users/current')
    .set('Accept', 'application/json')
    .set('Authorization', user.token)
    .send({
      name: "John Doe Updated",
      password: "@NewSecret123"
    })
    .expect(200);

  expect(response.body.data.id).toBeDefined();
  expect(response.body.data.name).toBe('John Doe Updated');

  const userUpdated = await prisma.user.findUnique({
    where: {
      token: user.token
    }
  });

  expect(await bcrypt.compare("@NewSecret123", userUpdated.password)).toBe(true);
});

test('Unauthenticated error test', async () => {
  const response = await request(web)
    .get('/api/users/current')
    .set('Accept', 'application/json')
    .set('Authorization', '123')
    .expect(401);

  expect(response.body.errors).toBe("Unauthenticated");
});