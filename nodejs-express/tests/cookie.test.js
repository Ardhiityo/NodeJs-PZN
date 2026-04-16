import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser('SECRET-KEY'));

app.post('/read', (req, res) => {
    const name = req.signedCookies['Hello'];
    res.send(`Hello ${name}`);
});

app.post('/write', (req, res) => {
    const name = req.body.name;
    res.cookie('Hello', name, { path: '/', signed: true });
    res.send(`Hello ${name}`);
});

test('request read cookie test', async () => {
    const response = await request(app)
        .post('/read')
        .set('Content-Type', 'application/json')
        .set('Cookie', 'Hello=s%3AWorld.UjGRY5dP0ujXtJQxx45AMh0FDicYUD81ioEnBr8eBxs;', { path: '/' });

    expect(response.text).toEqual('Hello World');
});

test('request write cookie test', async () => {
    const response = await request(app)
        .post('/write')
        .set('Content-Type', 'application/json')
        .send({ name: 'World' });

    expect(response.text).toEqual('Hello World');

    expect(response.get('Set-Cookie')).toEqual(["Hello=s%3AWorld.UjGRY5dP0ujXtJQxx45AMh0FDicYUD81ioEnBr8eBxs; Path=/"]);
});
