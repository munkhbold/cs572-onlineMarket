import { Order } from '../models';
import { ApiResponse } from '../utils/response';

export const createOrder = async (req, res, next) => {
  const user = req.user;
  if(user.cart === null || user.cart.items.length <= 0){
    res.status(401).send(new ApiResponse(401, 'error', { err: 'Cart is empty!' }));
    return;
  }
  
  await Order.placeOrder(user);
  res.status(200).send(new ApiResponse(200, 'success', null));
}
