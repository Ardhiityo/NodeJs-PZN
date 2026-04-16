import express from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/read', (req, res) => {
    const name = req.cookies['name'];
    res.send(`Hello ${name}`);
});

app.post('/write', (req, res) => {
    const name = req.body.name;
    res.cookie('Hello', name, { path: '/' });
    res.send(`Hello ${name}`);
});

test('request read cookie test', async () => {
    const response = await request(app)
        .post('/read')
        .set('Content-Type', 'application/json')
        .set('Cookie', 'name=World;author=PZN;', { path: '/' });

    expect(response.text).toEqual('Hello World');
});

test('request write cookie test', async () => {
    const response = await request(app)
        .post('/write')
        .set('Content-Type', 'application/json')
        .send({ name: 'World' });

    expect(response.text).toEqual('Hello World');

    expect(response.get('Set-Cookie')).toEqual(["Hello=World; Path=/"]);
});
