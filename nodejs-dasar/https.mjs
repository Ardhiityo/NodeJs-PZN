import { request } from 'node:https';

const options = {
    hostname: 'eoi9pk7kctf9qz3.m.pipedream.net',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const req = request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', (data) => {
        console.log(data.toString());
    });
});

req.on('error', (e) => {
    console.error(e);
});

req.write(JSON.stringify({ name: 'John Doe', age: 30 }));
req.end();
