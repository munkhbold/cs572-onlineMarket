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
import { verifyAdmin, verifyBuyer, verifySeller } from '../middlewares/verifyTokenMiddleware';

const router = Router();

router.put('/:productId/approve', verifyAdmin, approveProduct)
router.post('/:productId/reviews', verifyBuyer, addReview)
router.put('/:productId/reviews/:reviewId/approve', verifyAdmin, approveReview)

router.get('/', getProducts);
router.post('/', verifySeller, createProduct);
router.get('/:productId', getProductById);
router.put('/:productId', verifySeller, updateProduct);
router.delete('/:productId', verifySeller, removeProductById);

export default router;
