import express from "express";
import request from 'supertest';
import mustacheExpress from 'mustache-express';
import path from "path";

const app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '../src/views'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hello Title',
        content: 'Hello Content'
    });
});

test('request / test', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('Hello Title');
    expect(response.text).toContain('Hello Content');
});