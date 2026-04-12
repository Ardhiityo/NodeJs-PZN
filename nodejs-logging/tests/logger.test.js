import winston from 'winston';

test('logger with winston', () => {
    const logger = winston.createLogger({});

    logger.log({
        level: 'info',
        message: 'Sample log'
    });
});