import express from 'express';
import request from 'supertest';

const app = express();

app.use((req, res, next) => {
    res.status(404).send(`Not Found Euy`);
});

test('request / test', async () => {
    const response = await request(app)
        .get('/');

    expect(response.status).toBe(404);
    expect(response.text).toBe('Not Found Euy');
});

