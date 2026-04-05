import net from 'node:net';

const client = net.createConnection({ port: 3000 }, () => {
    console.log('connected to server!');
});

client.on('data', (data) => {
    console.log(`Server said: ${data.toString()}`);
});

setInterval(() => {
    client.write(`Hello ${process.argv[2]}\r\n`);
}, 3000);
