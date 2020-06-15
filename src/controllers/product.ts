import { Product } from '../models';
import { ApiResponse } from '../utils/response';

export const approveProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const approvedProduct = await Product.approveProduct(productId);
    res.status(200).send(new ApiResponse(200, 'success', {product: approvedProduct}));

  } catch (e) {
    res.status(401).send(new ApiResponse(401, 'error', { errors: [e.message] }));  
  }

}

