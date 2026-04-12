import winston, { silly } from 'winston';

test('logger with winston', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'silly',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    winston.format.json()
                )
            })
        ]
    });

    logger.info('Sample log 1');
    logger.info('Sample log 2');
    logger.info('Sample log 3');
});