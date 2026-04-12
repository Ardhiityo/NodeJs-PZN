import winston from 'winston';

function callAsyncSample() {
    return Promise.reject('Ups, reject');
}

const logger = winston.createLogger({
    transports: [
        //akan mengirim ke semua transports
        //handleExceptions: true,

        //hanya dikirim ke transports ini saja
        new winston.transports.File({
            handleExceptions: true,
            handleRejections: true,
            filename: 'rejection.log'
        })
    ]
});

callAsyncSample();