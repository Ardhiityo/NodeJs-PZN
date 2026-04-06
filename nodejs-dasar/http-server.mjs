import http from 'node:http';

const server = http.createServer((req, res) => {

    if (req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        req.on('data', (chunk) => {
            res.write(chunk);
            res.end();
            console.log(chunk.toString());
        });
    } else {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: 'Method not allowed' }));
        res.end();
    }
});

server.listen(3000);
