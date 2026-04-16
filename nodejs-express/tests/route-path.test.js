import express from "express";
import request from 'supertest';

const app = express();

app.get('/products/:name.json', (req, res) => {
    res.send(req.originalUrl);
});

app.get('/categories/:id.json', (req, res) => {
    if (!/^\d+$/.test(req.params.id)) {
        return res.status(404).end();
    }
    res.send(req.originalUrl);
});

test('request / test', async () => {
    let response = await request(app).get('/products/eko.json');
    expect(response.text).toBe('/products/eko.json');

    response = await request(app).get('/products/123');
    expect(response.status).toBe(404);


    response = await request(app).get('/categories/123.json');
    expect(response.text).toBe('/categories/123.json');

    response = await request(app).get('/categories/123');
    expect(response.status).toBe(404);
});
