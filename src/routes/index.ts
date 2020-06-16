import users from './users';
import orders from './orders';
import products from './products';
import auth from './auth';
import { Router } from 'express';

const router = Router();

router.use('/', auth);
router.use('/', users);
router.use('/orders', orders);
router.use('/products', products);
export default router;