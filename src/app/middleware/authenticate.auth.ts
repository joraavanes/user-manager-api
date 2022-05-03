import { NextFunction, Request, Response } from "express";

import { UsersService } from "../../modules/users/user.service";
import { catchErrors } from "../errors/asyncCatch";

// Checks the incoming token and verifies it
const authenticate = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { email, token } = req.body;

    const data: any = UsersService.verifyToken(token);

    const user = await UsersService.getUserByToken(token);

    // Checks if the user has 'admin' role to obtain the request anyway
    if(user?.role === 'admin') {
        return next();
    }

    // Checks if the token data refers to the user making the request
    if (data.email === email && user) {
        return next();
    }

    throw new Error('Not Authenticated');
});

export default authenticate;