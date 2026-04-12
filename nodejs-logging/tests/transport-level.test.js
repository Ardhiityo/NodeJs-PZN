import winston from 'winston';

test('logger with winston', () => {
    const logger = winston.createLogger({
        level: 'info',
        transports: [
            //akan menggunakan level info
            new winston.transports.Console({}),

            //akan menggunakan level info
            new winston.transports.File({
                filename: 'app.log'
            }),

            new winston.transports.File({
                level: 'error',
                filename: 'error.log'
            }),
        ]
    });

    logger.info('Sample info');
    logger.error('Sample error');
});