import winston from 'winston';

test('logger with winston', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({}),
            new winston.transports.File({ filename: 'application.log' })
        ]
    });

    logger.warn('Sample log 2');
    logger.info('Sample log 1');
});