import express from 'express';
import request from 'supertest';
import fileUpload from 'express-fileupload';
import path from 'path';

const app = express();
app.use(fileUpload());

app.post('/upload', async (req, res) => {
    const file = req.files.sample;
    await file.mv(path.join(__dirname, '/../storage/', file.name));
    res.send(`File uploaded! ${req.body.username}`);
});

test('request /upload test', async () => {
    const response = await request(app)
        .post('/upload')
        .set('Content-Type', 'multipart/form-data')
        .field('username', 'budi')
        .attach('sample', path.join(__dirname, '/../src/example.txt'));

    expect(response.text).toBe(`File uploaded! budi`);
});

