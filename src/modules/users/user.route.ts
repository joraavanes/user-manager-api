import { Router } from 'express';
import * as routes from './user.controller';
import authorize from '../../app/middleware/auth';

const router = Router();

router.post('/login', routes.loginUser);

// router.post('/', (req: Request, res: Response, next: NextFunction) => a(req, res) );
router.post('/', authorize, routes.createUser);

export default router;