import { Router } from 'express';
import { login, registerBuyer, registerSeller, updateCart, getCart} from '../controllers/user';
const router = Router();

router.post('/shopping-cart/update', updateCart);
router.get('/shopping-cart', getCart);

export default router;
