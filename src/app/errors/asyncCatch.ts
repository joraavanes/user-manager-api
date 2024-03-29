import { NextFunction, Request, RequestHandler, Response } from "express";

export const catchErrors = (requestHandler: RequestHandler): RequestHandler => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
        return await requestHandler(req, res, next);
      } catch (error) {
        next(error);
      }
    };
  };