import { ApiResponse } from '../utils/response';
import { User } from '../models';
import { USER_ROLES } from '../constants';
import * as jwt from 'jsonwebtoken';
import config from '../config';

const verifyUserToken = async (authHeader)=>{
  if (!authHeader)
    throw new Error('No Token Provided!');

  const token = authHeader.split(' ')[1];
  const decodedResponse = await jwt.verify(token, config.jwtKey);
  const user = await User.findById(decodedResponse.payload._id);
  if(!user)
    throw new Error(`User not found`);

  return user;
}

export const verifyBuyer = async (req, res, next)=>{
  try{
    const user = await verifyUserToken(req.headers['authorization']);
    if(![USER_ROLES.ADMIN, USER_ROLES.SELLER, USER_ROLES.BUYER].find(role => role === user.role))
      throw new Error('Permission denied');

    req.user = user;
    next();
  }catch(e){
    return res.status(403).send(new ApiResponse(403, 'error', { errors: [`Authorization: ${e.message}`] }));
  }
}

export const verifySeller = async (req, res, next)=>{
  try{
    const user = await verifyUserToken(req.headers['authorization']);
    if(![USER_ROLES.ADMIN, USER_ROLES.SELLER].find(role => role === user.role))
      throw new Error('Permission denied');

    req.user = user;
    next();
  }catch(e){
    return res.status(403).send(new ApiResponse(403, 'error', { errors: [`Authorization: ${e.message}`] }));
  }
}

export const verifyAdmin = async (req, res, next)=>{
  try{
    const user = await verifyUserToken(req.headers['authorization']);
    if(user.role !== USER_ROLES.ADMIN)
      throw new Error('Permission denied');
    req.user = user;
    next();
  }catch(e){
    return res.status(403).send(new ApiResponse(403, 'error', { errors: [`Authorization: ${e.message}`] }));
  }
}
