import { createReadStream, createWriteStream } from 'node:fs';

const writeable = createWriteStream('node.log');
writeable.write('Hello\n');
writeable.end('World\n');
// Writing more now is not allowed!

const readable = createReadStream('node.log');
readable.on('data', (chunk) => {
    console.log(chunk.toString());
});
