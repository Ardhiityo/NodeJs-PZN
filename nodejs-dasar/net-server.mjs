import net from 'node:net';

const server = net.createServer((c) => {
    console.log('client connected');

    c.on('data', (data) => {
        console.log(`Client said: ${data.toString()}`);
        c.write(data.toString());
    });

    c.on('end', () => console.log('client disconnected'));
});

server.listen(3000, () => {
    console.log('server bound on port 3000');
});
