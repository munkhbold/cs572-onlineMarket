import { Router } from 'express';
import { createOrder, getOrdersByUser, updateOrderStatus } from '../controllers/order';
import { verifyBuyer, verifySeller } from '../middlewares/verifyTokenMiddleware';
const router = Router();

router.get('/', verifyBuyer, getOrdersByUser);
router.post('/', verifyBuyer, createOrder);
router.put('/:orderId', verifySeller, updateOrderStatus)


// router.post('/order/:orderId/cancel', orderCancel);
// router.post('/order/:orderId/change', statusChange);
// router.post('/orders', ordersForSeller);

export default router;
