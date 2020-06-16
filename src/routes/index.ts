import users from './users';
import orders from './orders';
import products from './products';
import { Router } from 'express';

const router = Router();

router.use('/', users);
router.use('/orders', orders);
router.use('/products', products);
export default router;