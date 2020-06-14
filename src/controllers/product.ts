import { Product } from '../models';
import { ApiResponse } from '../utils/response';
// import import parseErrors

export const approveProduct = async (req, res, next) => {
  console.log('orson');
  const productId = req.params.id;
  // try {
  const approvedProduct = await Product.approveProduct(productId);
  // } catch (e) {
  //   res.status(401).send(new ApiResponse(401, 'error', {erros: parseErrors(e.errors)}))
  // }
  res.status(200).send(new ApiResponse(200, 'success', {product: approvedProduct}));
}