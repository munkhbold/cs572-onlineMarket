import { Router } from 'express';
import { createOrder, getOrdersByUser, updateOrderStatus } from '../controllers/order';
const router = Router();

router.get('/', getOrdersByUser);
router.post('/create', createOrder);
router.put('/:orderId', updateOrderStatus)


// router.post('/order/:orderId/cancel', orderCancel);
// router.post('/order/:orderId/change', statusChange);
// router.post('/orders', ordersForSeller);

export default router;
