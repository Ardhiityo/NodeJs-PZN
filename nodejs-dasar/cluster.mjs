import cluster from 'node:cluster';
import os from 'node:os';
import http from 'node:http';

if (cluster.isPrimary) {
    const cpus = os.cpus().length;
    for (let i = 0; i < cpus; i++) {
        //menjalankan worker sebanyak jumlah core cpu
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.log('Forking new worker...');
        cluster.fork();
    });
}

if (cluster.isWorker) {
    http.createServer((req, res) => {
        res.write(`Hello from worker ${process.pid}`);
        res.end();
        cluster.worker.kill();
    }).listen(3000);
}
