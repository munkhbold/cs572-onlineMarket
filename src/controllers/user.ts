import {ApiResponse} from '../utils/response';
import {Product} from '../models';

export const updateCart = async (req, res, next) => {
  try {
    const user = req.user;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    await user.updateCart(productId, quantity);
    res.status(200).send(new ApiResponse(200, 'success', {user: user}));
  }
  catch (err) {
    res.status(401).send(new ApiResponse(200, 'error', { errors: [err.message]}));
  }
}

export const getCart = async (req, res, next) => {
  try {
    let prodIds = req.user.cart.items.map(e => e.productId);
    let products = await Product.getPrductsByIds(prodIds);
    const responseResult = [];
    for (let product of products) {
      let item = req.user.cart.items.find(e => e.productId.toString() === product._id.toString());
      responseResult.push({product: product, quantity: item.quantity});
    }
    res.status(200).send(new ApiResponse(200, 'success', {items: responseResult}));
  }
  catch (err) {
    res.status(401).send(new ApiResponse(200, 'error', { errors: [err.message]}));
  }
}