import { Router } from 'express';
import { updateCart, getCart } from '../controllers/user';
import { verifyBuyer } from '../middlewares/verifyTokenMiddleware';
const router = Router();

router.post('/shopping-cart/update', verifyBuyer, updateCart);
router.get('/shopping-cart', verifyBuyer, getCart);

export default router;
