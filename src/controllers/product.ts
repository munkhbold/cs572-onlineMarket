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
            console.log(err.message);
            res.status(500).send(new ApiResponse(500, 'error', err.message));
        });
};

export const getProductsByCategory = (req, res, next) => {
    Product.find({category: {$regex: req.params.category, $options:"i" }})
        .then(products => {
            console.log(products);
            res.status(200).send(new ApiResponse(200, 'success', products));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

export const approveProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const responseResult = await Product.approveProduct(productId);
    res.status(200).send(new ApiResponse(200, 'success', {product: responseResult}));

  } catch (e) {
    res.status(401).send(new ApiResponse(401, 'error', { errors: [e.message] }));  
  }
}

export const addReview = async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.params.productId;
  const comment = req.body.comment;
  try {
    const responseResult = await Product.addReview(userId, productId, comment);
    res.status(200).send(new ApiResponse(200, 'success', {product: responseResult}));
  } catch (e) {
    res.status(401).send(new ApiResponse(401, 'error', { errors: [e.message] }));  
  }
}

export const approveReview = async (req, res, next) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  console.log(reviewId);
  try {
    const responseResult = await Product.approveReview(productId, reviewId);
    res.status(200).send(new ApiResponse(200, 'success', {product: responseResult}));
  } catch (e) {
    res.status(401).send(new ApiResponse(401, 'error', { errors: [e.message] }));  
  }
}
