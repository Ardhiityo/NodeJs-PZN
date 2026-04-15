import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, function () {
    console.log('App listen on port : 3000');
});