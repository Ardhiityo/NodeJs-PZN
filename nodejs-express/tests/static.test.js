import express from "express";
import request from 'supertest';
import path from "path";

const app = express();

//without prefix path
//app.use(express.static(path.join(__dirname, '../public')));

//with prefix path
app.use('/assets', express.static(path.join(__dirname, '../public')));

// test('request /sample.txt test', async () => {
//     const response = await request(app).get('/sample.txt');
//     expect(response.text).toContain('This is a sample text file.');
// });

test('request /assets/sample.txt test', async () => {
    const response = await request(app).get('/assets/sample.txt');
    expect(response.text).toContain('This is a sample text file.');
});