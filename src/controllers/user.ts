import {ApiResponse} from '../utils/response';

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
    const user = req.user;
    res.status(200).send(new ApiResponse(200, 'success', {cart: user.cart}));
  }
  catch (err) {
    res.status(401).send(new ApiResponse(200, 'error', { errors: [err.message]}));
  }
}