import { NextFunction, Request, Response } from "express";

import { UsersService } from "../../modules/users/user.service";
import { catchErrors } from "../errors/asyncCatch";

const authenticate = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, token } = req.body;

    const data: any = UsersService.verifyToken(token);

    const user = await UsersService.getUserByToken(token);

    if(user?.role === 'admin') {
        return next();
    }

    if (data.email === email && user) {
        return next();
    }

    throw new Error('Not Authenticated');
});

export default authenticate;