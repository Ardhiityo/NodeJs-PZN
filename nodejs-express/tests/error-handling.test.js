import express from 'express';
import request from 'supertest';

const app = express();

const errorMiddleware = (err, req, res, next) => {
    res.status(500).send(`Error: ${err.message}`);
}

app.get('/', (req, res) => {
    throw new Error('Something went wrong');
});

app.use(errorMiddleware);

test('request / test', async () => {
    const response = await request(app)
        .get('/');

    expect(response.text).toBe('Error: Something went wrong');
});

