import { Router } from 'express';
import { approveProduct, addReview, approveReview} from '../controllers/product';
const router = Router();

router.put('/:productId/approve', approveProduct)
router.post('/:productId/reviews', addReview)
router.put('/:productId/reviews/:reviewId/approve', approveReview)

export default router;
