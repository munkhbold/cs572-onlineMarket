import { Router } from 'express';
import { list, getById, getCategories, getProductsByCategory} from '../controllers/product';
const router = Router();

router.get('/products', list);
router.get('/products/:productId', getById);
router.get('/products/:category', getProductsByCategory);

router.get('/categories', getCategories);

export default router;