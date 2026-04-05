import { createWriteStream } from 'node:fs';
import { Console } from 'node:console';

const fileStream = createWriteStream('app.log');

const logger = new Console({
    stdout: fileStream,
    stderr: fileStream
});

logger.log('Hello World');
logger.error('This is an error');
