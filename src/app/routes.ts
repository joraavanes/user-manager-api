import { Application, NextFunction, Request, Response } from "express";
import log4js from 'log4js';
import userRoutes from '../modules/users/user.route'

const logger = log4js.getLogger();

log4js.configure({
    appenders: { climedo: { type: "file", filename: "climedo.log" } },
    categories: { default: { appenders: ["climedo"], level: "error" } }
});

export function applyRoutes(app: Application){
    app.use('/auth', userRoutes);

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        logger.error(err.message);
        res.status(400).send({
            error: err.message
        });
    });
}