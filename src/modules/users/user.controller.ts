import { Request, NextFunction, Response, RequestHandler } from 'express';
import { catchErrors } from '../../app/errors/asyncCatch';
import { UsersService } from './user.service'

export class UsersController {
  static createUser(req: Request, res: Response) {
    // return new UsersService().createUser(email, password);
  }
}

export const loginUser = catchErrors(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await UsersService.loginUser(email, password);
});

export const createUser = catchErrors(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  await UsersService.createUser(email, password);
  res.send();
});

// export default createUser;