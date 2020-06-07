import { Router } from 'express';
import User from '../models/Users';
import config from '../config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import {ApiResponse} from '../utils/response';

// Login user
export const signin = async (req, res, next) => {
  try{
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if( !user ){
        res.status(401).send(new ApiResponse(401, 'error', { err: 'username or password not exist' }));
        return;
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if( !isValid ){
      res.status(401).send(new ApiResponse(401, 'error', { err: 'username or password not exist' }));
      return;        
    }

    const token = jwt.sign({data: email}, config.jwtKey, {
      expiresIn: config.jwtExpirySeconds
    });

    res.status(200).send(new ApiResponse(200, 'success', {
        token: token, 
        expiresIn: config.jwtExpirySeconds, 
        user:user}));
  } catch(err){
    console.log(err);
    res.status(500).send(new ApiResponse(500, 'error', err.message));
  }
}

// Register new user
export const signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const hashPwd = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email: email,
    password: hashPwd
  });
  res.status(200).send(new ApiResponse(200, 'success', { user: newUser}));
}