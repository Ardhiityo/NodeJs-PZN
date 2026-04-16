import express from "express";
import request from 'supertest';

const app = express();

app.get('/', (req, res) => {
    res.set({
        'X-POWERED-BY': 'PZN',
        'X-AUTHOR': 'EKO'
    }).end();
});

test('request / test', async () => {
    let response = await request(app).get('/');
    expect(response.get('X-POWERED-BY')).toBe('PZN');
    expect(response.get('X-AUTHOR')).toBe('EKO');
});