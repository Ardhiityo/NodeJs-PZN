import winston from 'winston';

test('logger with leveling', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                // - Write all logs with importance level of `error` or higher to `error.log`
                //   (i.e., error, fatal, but not other levels)
                level: 'silly'
            })
        ]
    });

    logger.log({
        level: 'error',
        message: 'Sample error'
    });

    logger.log({
        level: 'warn',
        message: 'Sample warn'
    });

    logger.log({
        level: 'info',
        message: 'Sample info'
    });

    logger.log({
        level: 'http',
        message: 'Sample http'
    });

    logger.log({
        level: 'verbose',
        message: 'Sample verbose'
    });

    logger.log({
        level: 'debug',
        message: 'Sample debug'
    });

    logger.log({
        level: 'silly',
        message: 'Sample silly'
    });
});

test('logger with leveling shortcut', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                // - Write all logs with importance level of `error` or higher to `error.log`
                //   (i.e., error, fatal, but not other levels)
                level: 'silly'
            })
        ]
    });

    logger.error('Sample error');

    logger.warn('Sample warn');

    logger.info('Sample info');

    logger.http('Sample http');

    logger.verbose('Sample verbose');

    logger.debug('Sample debug');

    logger.silly('Sample silly');
});