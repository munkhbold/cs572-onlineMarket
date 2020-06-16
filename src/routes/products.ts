import { Router } from 'express';
import {
    approveProduct,
    addReview,
    approveReview,
    getProductById,
    getProducts,
    createProduct,
    updateProduct,
    removeProductById
} from '../controllers/product';

const router = Router();

router.put('/:productId/approve', approveProduct)
router.post('/:productId/reviews', addReview)
router.put('/:productId/reviews/:reviewId/approve', approveReview)

router.get('/', getProducts);
router.post('/', createProduct);
router.get('/:productId', getProductById);
router.put('/:productId', updateProduct);
router.delete('/:productId', removeProductById);

export default router;
