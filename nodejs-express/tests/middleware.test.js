import express from "express";
import request from 'supertest';

const app = express();

const logger = (req, res, next) => {
    console.log(`Received ${req.method} : ${req.originalUrl}`)
    next();
}

const setHeader = (req, res, next) => {
    res.set('X-POWERED-BY', 'PZN');
    next();
}

const apiKey = (req, res, next) => {
    if (req.query.apiKey) {
        next();
    } else {
        res.status(401).end();
    }
}

const setQuery = (req, res, next) => {
    req.query.today = Date.now();
    next();
}

app.use(logger);
app.use(setHeader);
app.use(apiKey);
app.use(setQuery);

app.get('/', (req, res) => {
    res.send(`Hello Eko : ${req.today}`);
});

test('request / test success', async () => {
    let response = await request(app).get('/').query({ apiKey: 123 });
    expect(response.get('X-POWERED-BY')).toBe('PZN');
    expect(response.text).toContain('Hello Eko :');
});

test('request / test failed', async () => {
    let response = await request(app).get('/');
    expect(response.get('X-POWERED-BY')).toBe('PZN');
    expect(response.status).toBe(401);
});