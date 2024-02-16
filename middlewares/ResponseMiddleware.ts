import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

export const ResponseLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const start = new Date(); 

    res.on('finish', () => {
        const duration = new Date().getTime() - start.getTime(); 
        logger.info({
            statusCode: res.statusCode, 
            duration, 
            timestamp: new Date().toISOString() 
        });
    });

    next();
};

export default ResponseLoggerMiddleware;