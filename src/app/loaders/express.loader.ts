import express, { Request, Response, Application, ErrorRequestHandler, NextFunction } from 'express';
import userRoutes from '../../modules/users/user.route'
import authenticate from '../middleware/authenticate.auth';
import log4js from 'log4js';
import { AnyError } from 'mongodb';

log4js.configure({
    appenders: { climedo: { type: "file", filename: "climedo.log" } },
    categories: { default: { appenders: ["climedo"], level: "error" } }
});

const logger = log4js.getLogger();

export const expressLoader = (): Application => {
    const app = express();

    app.use(express.json());
    app.use('/auth', userRoutes);

    app.get('/', (req: Request, res: Response, next: NextFunction) => {
        res.send('Express app is running!')
    });

    app.use((err: AnyError, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        logger.error(err.message);
        res.status(500).send('Server error');
    });

    return app;
};