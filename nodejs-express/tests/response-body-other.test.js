import express from "express";
import request from 'supertest';
import path from "path";

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/sample.txt'));
});

test('request / test', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Hello World');
});