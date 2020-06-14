import { Router } from 'express';
import { approveProduct } from '../controllers/product';
const router = Router();

router.put('/:id/approve', approveProduct)

export default router;
