import { Router } from 'express';
import {
    list,
    getById,
    getCategories,
    getProductsByCategory,
    approveProduct,
    addReview,
    approveReview
} from '../controllers/product';

const router = Router();

router.get('/', list);
router.get('/categories', getCategories);
router.get('/categories/:category', getProductsByCategory);
router.get('/:productId', getById);

router.put('/:productId/approve', approveProduct)
router.post('/:productId/reviews', addReview)
router.put('/:productId/reviews/:reviewId/approve', approveReview)

export default router;
