import * as winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logger.log' })
    ]
});

export default logger;