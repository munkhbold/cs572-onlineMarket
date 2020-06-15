import { ApiResponse } from './response';
import * as jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../models';

export const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).send(new ApiResponse(403, 'error', { errors: ['No Token Provided!'] }));
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwtKey, async (err, decoded) => {
        if (err) {
            return res.status(401).send(new ApiResponse(401, 'error', { errors: ['Unauthorized!'] }));
        }
        req.user = await User.findById(decoded.payload._id);
        next();
    });
}