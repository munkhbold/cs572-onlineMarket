import { Router } from 'express';
import { login, register, updateCart} from '../controllers/user';
const router = Router();

router.post('/login', login);
router.post('/register', register);

router.post('/shopping-cart/update', updateCart);

export default router;
