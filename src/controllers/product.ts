import { Product } from '../models';
import { ApiResponse } from '../utils/response';

export const approveProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const responseResult = await Product.approveProduct(productId);
    res.status(200).send(new ApiResponse(200, 'success', {product: responseResult}));

  } catch (e) {
    res.status(401).send(new ApiResponse(401, 'error', { errors: [e.message] }));  
  }
}

export const addReview = async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.params.productId;
  const comment = req.body.comment;
  try {
    const responseResult = await Product.addReview(userId, productId, comment);
    res.status(200).send(new ApiResponse(200, 'success', {product: responseResult}));
  } catch (e) {
    res.status(401).send(new ApiResponse(401, 'error', { errors: [e.message] }));  
  }
}

export const approveReview = async (req, res, next) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  console.log(reviewId);
  try {
    const responseResult = await Product.approveReview(productId, reviewId);
    res.status(200).send(new ApiResponse(200, 'success', {product: responseResult}));
  } catch (e) {
    res.status(401).send(new ApiResponse(401, 'error', { errors: [e.message] }));  
  }
}
