import winston from 'winston';
import 'winston-daily-rotate-file';

test('rotate file test', () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.DailyRotateFile({
                level: 'info', //akan di logging di level info dan keatas
                filename: 'application-%DATE%.log', //nama log file
                datePattern: 'YYYY-MM-DD-HH', //format nama waktu file
                zippedArchive: true, //file yang sudah lama akan di zip
                maxSize: '1m', //max 1 file bernilai 1mb
                maxFiles: '14d' //file akan disimpan selama 14 hari
            })
        ]
    })

    for (let i = 0; i < 100000; i++) {
        logger.info(`Hello world ${i}`);
    }
});
