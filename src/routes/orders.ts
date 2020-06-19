import { Router } from 'express';
import { createOrder, getOrdersByUser, updateOrderStatus, getOrders, cancelOrderByUser } from '../controllers/order';
import { verifyBuyer, verifySeller } from '../middlewares/verifyTokenMiddleware';
const router = Router();

router.get('/', verifyBuyer, getOrders);
router.post('/', verifyBuyer, createOrder);
router.get('/history', verifyBuyer, getOrdersByUser);
router.delete('/:orderId/cancel', verifyBuyer, cancelOrderByUser);
router.put('/:orderId', verifySeller, updateOrderStatus)

export default router;
