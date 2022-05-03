import { Router } from 'express';

import * as routes from './user.controller';
import authorize from '../../app/middleware/authenticate.auth';
import authenticate from '../../app/middleware/authenticate.auth';

const router = Router();

// Signs up a new user
router.post('/signup', routes.createUser);

// Signs in a user
router.post('/signin', routes.loginUser);

// Updates user information
router.patch('/update', authenticate, routes.updateUser);

router.post('/signout', )

export default router;