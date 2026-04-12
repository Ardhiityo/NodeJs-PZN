import winston from 'winston';

test('logger with winston', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                // 
            })
        ]
    });

    logger.log({
        level: 'info',
        message: 'Sample log'
    });
});