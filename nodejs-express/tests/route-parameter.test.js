import express from "express";
import request from 'supertest';

const app = express();

app.get('/products/:name', (req, res) => {
    res.send(`Products : ${req.params.name}`);
});

app.get('/categories/:id', (req, res) => {
    res.send(`Categories : ${req.params.id}`);
});

test('request / test', async () => {
    let response = await request(app).get('/products/sepatu');
    expect(response.text).toBe('Products : sepatu');

    response = await request(app).get('/categories/123');
    expect(response.text).toBe('Categories : 123');
});
