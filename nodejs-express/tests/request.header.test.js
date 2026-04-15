import express from "express";
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.send(`Hello ${req.get('Accept')}`);
});

test('request / test', async () => {
    const response = await request(app)
        .get('/')
        .set('Accept', 'application/json');
    expect(response.text).toBe('Hello application/json');
});