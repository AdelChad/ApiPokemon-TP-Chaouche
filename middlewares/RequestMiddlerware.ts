import { Request, Response, NextFunction } from 'express';
import logger from '../logger';

const LoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    logger.info({
        method: req.method,
        url: req.url,
        ip: req.ip
    });

    next();
};

export default LoggerMiddleware;