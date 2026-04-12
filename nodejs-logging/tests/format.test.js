import winston, { silly } from 'winston';

test('logger with winston', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                level: 'silly',
                //default
                //format: winston.format.json() 

                //simple
                //format: winston.format.simple() ,

                //custom
                format: winston.format.printf(({ level, message }) => {
                    return `${new Date()} ${level}: ${message}`;
                })
            })
        ]
    });

    logger.info('Sample log');
});