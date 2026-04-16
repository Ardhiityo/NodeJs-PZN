import express from "express";
import request from 'supertest';

const app = express();
const router = express.Router();

router.use((req, res, next) => {
    console.log(`Received ${req.method} : ${req.originalUrl}`);
    next();
});

router.get('/feature-a', (req, res) => {
    res.send(`Hello World`);
});

test('request / test success', async () => {
    app.use(router);
    let response = await request(app).get('/feature-a');
    expect(response.text).toBe('Hello World');
});

test('request / test failed', async () => {
    let response = await request(app).get('/feature-a');
    expect(response.status).toBe(404);
});
