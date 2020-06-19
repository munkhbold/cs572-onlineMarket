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
  const isPoint = req.body.isPoint;
  console.log(isPoint);

  try{
    await Order.placeOrder(user, billingAddress, shippingAddress, isPoint);
  } catch(error){
    res.status(401).send(new ApiResponse(401, 'error', { errors: [parseErrors(error)] }));  
    return;
  }

  res.status(200).send(new ApiResponse(200, 'success', null));
}

export const getOrdersByUser = async (req, res, next)=>{
  const clientId = req.user._id;
  const orders = await Order.find({ clientId }).populate({
    path: 'items',
    populate: {
      path: 'productId',
      model: 'Product'
    }
  }).populate('clientId');
  res.status(200).send(new ApiResponse(200, 'success', orders));
}


export const getOrders = async (req, res, next)=>{
  const query = {};
  if(req.query.sellerId){
    query['sellerId'] = req.query.sellerId;
  }
  const orders = await Order.find(query).populate({
    path: 'items',
    populate: {
      path: 'productId',
      model: 'Product'
    }
  }).populate('clientId');
  res.status(200).send(new ApiResponse(200, 'success', orders));
}


export const cancelOrderByUser = async (req, res, next)=>{
  const buyerId = req.user._id;
  const orderId = req.params.orderId;
  try{
    const order = await Order.updateOrderStatus(orderId, buyerId, 'canceled');
    res.status(200).send(new ApiResponse(200, 'success', order));
  }catch(e){
    res.status(401).send(new ApiResponse(401, 'error', {errors: [e.message]}));
  }
}
export const updateOrderStatus = async (req, res, next)=>{
  const buyerId = req.user._id;
  const orderId = req.params.orderId;
  const status = req.body.status;
  try{
    const order = await Order.updateOrderStatus(orderId, buyerId, status);
    res.status(200).send(new ApiResponse(200, 'success', order));
  }catch(e){
    res.status(401).send(new ApiResponse(401, 'error', {errors: [e.message]}));
  }
}