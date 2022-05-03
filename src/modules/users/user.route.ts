import { Router } from 'express';

import * as routes from './user.controller';
import authenticate from '../../app/middleware/authenticate.auth';

const router = Router();

// Signs up a new user
router.post('/signup', routes.createUser);

// Signs in a user
router.post('/signin', routes.loginUser);

// Updates user information with data payload
router.patch('/update', authenticate, routes.updateUser);

// Signs out the user by token
router.post('/signout', authenticate, routes.logoutUser);

export default router;