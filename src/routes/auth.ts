import { Router } from 'express';
import { login, registerBuyer, registerSeller} from '../controllers/auth';
const router = Router();

router.post('/login', login);
router.post('/register/buyer', registerBuyer);
router.post('/register/seller', registerSeller);

export default router;