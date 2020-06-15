import {ApiResponse} from './response';
import jwt from 'jsonwebtoken';
import config from '../config';
import {User} from '../models';

export const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send(new ApiResponse(403, 'error', { err: 'No Token Provided!' }));
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwtKey, async (err, decoded) => {
        req.user = await User.findById(decoded._id);
        if (err) {
            return res.status(401).send(new ApiResponse(401, 'error', { err: 'Unauthorized!' }));
        }
        next();
    });
}

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(401).json(new ApiResponse(401, 'error', { message: "Unauthorized ADMIN" }));
    }
    return next();
}
export const authorizeSeller = (req, res, next) => {
    if (req.user.role !== 'SELLER') {
        return res.status(401).json(new ApiResponse(401, 'error', { message: "Unauthorized SELLER" }));
    }
    return next();
}
export const authorizeBuyer = (req, res, next) => {
    if (req.user.role !== 'BUYER') {
        return res.status(401).json(new ApiResponse(401, "error", { message: "Unauthorized BUYER" }));
    }
    return next();
}