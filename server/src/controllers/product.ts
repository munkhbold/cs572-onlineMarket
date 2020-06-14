import { Product } from '../models';
import { ApiResponse } from '../utils/response';

export const getById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};


export const list = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(200).send(new ApiResponse(200, 'success', products));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

export const getCategories = (req, res, next) => {
    Product.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        { $project: { _id: 0, category: '$_id', count: 1 } }
    ])
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

export const getProductsByCategory = (req, res, next) => {
    Product.find({ category: req.params.category })
        .then(products => {
            res.status(200).send(new ApiResponse(200, 'success', products));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};