import { parentPort, threadId } from 'node:worker_threads';

parentPort.on('message', (message) => {
    for (let i = 0; i < message; i++) {
        console.log(`Data : ${i} from thread ${threadId}`);
        parentPort.postMessage(i);
    }
    parentPort.close();
});