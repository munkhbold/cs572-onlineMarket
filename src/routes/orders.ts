import { Router } from 'express';
import { createOrder } from '../controllers/order';
const router = Router();

router.post('/create', createOrder);

export default router;
