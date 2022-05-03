import { Request, Response } from 'express';

import { catchErrors } from '../../app/errors/asyncCatch';
import { UsersService } from './user.service'

export const createUser = catchErrors(async (req: Request, res: Response) => {
  const { email, password, fullname, birthdate, lastLogin } = req.body;

  const result = await UsersService.createUser(email, password, fullname, birthdate, lastLogin);

  res.send(result);
});

export const loginUser = catchErrors(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await UsersService.loginUser(email, password);

  res.send({
    'X-AUTH-TOKEN': token
  });
});

export const updateUser = catchErrors(async (req: Request, res: Response) => {
  const { email, password, fullname, birthdate } = req.body;
  const result = await UsersService.updateUser(email, fullname, birthdate, password);

  res.send({
    email: result?.email,
    fullname: result?.fullname,
    birthdate: result?.birthdate
  });
});