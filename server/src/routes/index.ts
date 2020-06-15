import users from './users';
import orders from './orders';
import products from './products';
import seller from './seller';
import { Router } from 'express';

const router = Router();

router.use('/', users);
router.use('/orders', orders);
router.use('/products', products);
router.use('/seller', seller);
export default router;