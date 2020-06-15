import { Router } from 'express';
import { createOrder, getOrdersByUser, cancelOrderById } from '../controllers/order';
const router = Router();

router.get('/', getOrdersByUser);
router.post('/create', createOrder);
router.get('/:orderId/cancel', cancelOrderById)

export default router;
