import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/json', (req, res) => {
    res.json({ hello: `${req.body.name}` });
});

app.post('/form', (req, res) => {
    res.json({ hello: `${req.body.name}` });
});

test('request json test', async () => {
    const response = await request(app)
        .post('/json')
        .set('Content-Type', 'application/json')
        .send({ name: 'World' });

    expect(response.body).toEqual({ hello: 'World' })
});

test('request form test', async () => {
    const response = await request(app)
        .post('/form')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send('name=World');

    expect(response.body).toEqual({ hello: 'World' })
});

