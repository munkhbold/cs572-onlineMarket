import { Router } from 'express';
import { User } from '../models';
import config from '../config';
import * as jwt from 'jsonwebtoken';

import { body } from 'express-validator';
import {ApiResponse} from '../utils/response';
import { parseErrors } from '../utils/responseErrors';

// Login user
export const login = async (req, res, next) => {
  try{
    const email = req.body.email;
    const password = req.body.password;
    
    const result = await User.authenticate(email, password);
    res.status(200).send(new ApiResponse(200, 'success', result));
  } catch(err){
    res.status(500).send(new ApiResponse(500, 'error', { errors: [err.message]}));
  }
}

// Register new buyer
export const registerBuyer = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try{
    const newUser = await User.createUser(email, password, 'buyer')
    res.status(200).send(new ApiResponse(200, 'success', { user: newUser}));
  }catch(err){
    res.status(401).send(new ApiResponse(401, 'error', { errors: [err.message]}));
  }
}

// Register new seller
export const registerSeller = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try{
    const newUser = await User.createUser(email, password, 'seller')
    res.status(200).send(new ApiResponse(200, 'success', { user: newUser}));
  }catch(err){
    res.status(401).send(new ApiResponse(401, 'error', { errors: err.message}));
  }
}