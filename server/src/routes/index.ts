import users from './users';
import orders from './orders';

import { Router } from 'express';

const router = Router();

router.use('/', users);
router.use('/orders', orders);
export default router;