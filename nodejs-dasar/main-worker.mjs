import { Worker, threadId } from 'node:worker_threads';

const worker1 = new Worker('./worker.mjs');
const worker2 = new Worker('./worker.mjs');

worker1.on('message', (message) => {
    console.log(`Received from worker 1 : ${message} from thread ${threadId}`);
});

worker2.on('message', (message) => {
    console.log(`Received from worker 2 : ${message} from thread ${threadId}`);
});

worker1.postMessage(10);
worker2.postMessage(10);
