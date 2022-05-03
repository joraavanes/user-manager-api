import { NextFunction, Request, Response } from "express";

const authorize = (req: Request, res: Response, next: NextFunction) => {
    console.log('this is auth middleware');
    next();
};

export default authorize;