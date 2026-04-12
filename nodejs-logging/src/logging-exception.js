import winston from 'winston';

const logger = winston.createLogger({
    transports: [
        //akan mengirim ke semua transports
        //handleExceptions: true,

        //hanya dikirim ke transports ini saja
        new winston.transports.File({
            handleExceptions: true,
            filename: 'exception.log'
        })
    ]
});

hello();