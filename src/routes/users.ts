import { Router } from 'express';
import { login, register, updateCart, getCart} from '../controllers/user';
const router = Router();

router.post('/login', login);
router.post('/register', register);

router.post('/shopping-cart/update', updateCart);
router.get('/shopping-cart', getCart);

export default router;
