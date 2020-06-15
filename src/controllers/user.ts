import { User } from '../models';
import {ApiResponse} from '../utils/response';
import { parseErrors } from '../utils/responseErrors';

// Login user
export const login = async (req, res, next) => {
  try{
    const email = req.body.email;
    const password = req.body.password;
    
    const result = User.authenticate(email, password);
    res.status(200).send(new ApiResponse(200, 'success', result));
  } catch(err){
    res.status(500).send(new ApiResponse(500, 'error', { errors: parseErrors(err.errors)}));
  }
}

// Register new buyer
export const registerBuyer = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try{
    const newUser = await User.createUser(email, password, 'buyer')
    res.status(200).send(new ApiResponse(200, 'success', { user: newUser}));
  }catch(e){
    res.status(401).send(new ApiResponse(401, 'error', { errors: e.errors}));
  }
}

// Register new seller
export const registerSeller = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try{
    const newUser = await User.createUser(email, password, 'seller')
    res.status(200).send(new ApiResponse(200, 'success', { user: newUser}));
  }catch(e){
    res.status(401).send(new ApiResponse(401, 'error', { errors: e.errors}));
  }
}

export const updateCart = async (req, res, next) => {
  const user = req.user;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  await user.updateCart(productId, quantity);
  res.status(200).send(new ApiResponse(200, 'success', {user: user}));
}

export const getCart = async (req, res, next) => {
  const user = req.user;
  res.status(200).send(new ApiResponse(200, 'success', {cart: user.cart}));
}