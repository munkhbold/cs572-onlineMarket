import users from './users';
import products from './products';
import orders from './orders';

import { Router } from 'express';

const router = Router();

router.use('/', users);
router.use('/products', products);

router.use('/orders', orders);
export default router;