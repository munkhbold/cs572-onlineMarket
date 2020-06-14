import users from './users';
import products from './products';

import { Router } from 'express';

const router = Router();

router.use('/', users);
router.use('/products', products);

export default router;