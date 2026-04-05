import zlib from 'node:zlib';
import { readFile, writeFile } from 'node:fs/promises';

const source = await readFile('zlib.mjs');

//compress
zlib.gzip(source, async function (error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result.toString());
        await writeFile('zlib.mjs.txt', result);

        const source2 = await readFile('zlib.mjs.txt');

        //decompress
        zlib.unzip(source2, function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result.toString());
            }
        });
    }
});
