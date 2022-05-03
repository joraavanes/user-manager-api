import { Router } from 'express';
import * as routes from './user.controller';
import authorize from '../../app/middleware/authenticate.auth';

const router = Router();

// Signs up a new user
router.post('/signup', authorize, routes.createUser);

// Signs in a user
router.post('/signin', routes.loginUser);

export default router;