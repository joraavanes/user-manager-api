import { NextFunction, Request, Response } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
    console.log('this is auth middleware');
    console.log(req.headers);
    next();
};

export default auth;