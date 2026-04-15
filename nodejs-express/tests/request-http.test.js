import express from "express";
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello ${req.query.name}`);
});

test('request / test', async () => {
    const response = await request(app).get('/').query({ name: 'Eko' });
    expect(response.text).toBe('Hello Eko');
});