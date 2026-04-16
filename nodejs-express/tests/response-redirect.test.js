import express from "express";
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.redirect(301, 'to-next-page');
});

test('request / test', async () => {
    let response = await request(app).get('/');
    expect(response.status).toBe(301);
    expect(response.get('location')).toBe('to-next-page');
});