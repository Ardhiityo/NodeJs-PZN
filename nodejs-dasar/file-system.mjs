import { readFile, writeFile } from 'node:fs/promises';

const file = await readFile('file-system.mjs', 'utf-8');
console.log(file);

await writeFile('node.log', file);

