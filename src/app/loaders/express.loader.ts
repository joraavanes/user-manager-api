import express, { Request, Response, Application, ErrorRequestHandler, NextFunction } from 'express';
import { applyRoutes } from '../routes';

export const expressLoader = (): Application => {
    const app = express();

    app.use(express.json());

    applyRoutes(app);
    return app;
};