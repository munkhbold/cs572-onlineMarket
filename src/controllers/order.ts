import { Order } from '../models';
import { ApiResponse } from '../utils/response';
import { parseErrors } from '../utils/responseErrors';

export const createOrder = async (req, res, next) => {
  const user = req.user;
  if(user.cart === null || user.cart.items.length <= 0){
    res.status(401).send(new ApiResponse(401, 'error', { errors: ['Cart is empty!'] }));
    return;
  }
  
  const shippingAddress = req.body.shippingAddress;
  const billingAddress = req.body.billingAddress;
  try{
    await Order.placeOrder(user, billingAddress, shippingAddress);
  } catch(validationError){
    res.status(401).send(new ApiResponse(401, 'error', { errors: parseErrors(validationError.errors) }));  
    return;
  }
  
  res.status(200).send(new ApiResponse(200, 'success', null));
}