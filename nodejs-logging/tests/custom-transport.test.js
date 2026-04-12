import winston from 'winston';
import TransportStream from 'winston-transport';

test('logger with custom transport', () => {
    class MyTransport extends TransportStream {
        constructor(option) {
            super(option);
        }

        log(info, next) {
            console.log(`${new Date()} ${info.level.toUpperCase()} : ${info.message}`)
            next();
        }
    }

    const logger = winston.createLogger({
        transports: [
            new MyTransport({
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