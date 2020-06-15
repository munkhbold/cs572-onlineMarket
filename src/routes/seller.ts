import { Router } from 'express';
import { listProducts, insertProduct, getProductById, patchProductById, removeProductById, orderCancel, statusChange,ordersForSeller} from '../controllers/seller';

const router = Router();

router.get('/products', listProducts);
router.post('/products', insertProduct);
router.get('/products/:productId', getProductById);
router.patch('/products/:productId', patchProductById);
router.delete('/products/:productId', removeProductById);

router.post('/order/:orderId/cancel', orderCancel);
router.post('/order/:orderId/change', statusChange);
router.post('/orders', ordersForSeller);
export default router;