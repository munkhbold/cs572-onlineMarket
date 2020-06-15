import { Router } from 'express';
import { list, getById, getCategories, getProductsByCategory} from '../controllers/product';
const router = Router();

router.get('/', list);
router.get('/categories', getCategories);
router.get('/categories/:category', getProductsByCategory);
router.get('/:productId', getById);

export default router;