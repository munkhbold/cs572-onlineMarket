import { Product, User } from '../models';
import { ApiResponse } from '../utils/response';


export const createProduct = async (req, res, next) => {
  try {  
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category,
      sellerId: req.user._id,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      unitPrice: req.body.unitPrice,
      qty: req.body.qty
    });
    res.status(200).send(new ApiResponse(200, 'success', {product}));
  } catch (e) {
    res.status(400).send(new ApiResponse(400, 'error', { errors: [e.message] }));  
  }
};

export const updateProduct = async (req, res, next) => {
  try {  
    const product = await Product.update({_id: req.params.productId} , {
      name: req.body.name,
      category: req.body.category,
      sellerId: req.user._id,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      unitPrice: req.body.unitPrice,
      qty: req.body.qty
    });
    res.status(200).send(new ApiResponse(200, 'success', {product}));
  } catch (e) {
    res.status(400).send(new ApiResponse(400, 'error', { errors: [e.message] }));  
  }
};


export const getProductById = async (req, res, next) => {
  try {  
    const product = await Product.findById(req.params.productId);
    res.status(200).send(new ApiResponse(200, 'success', {product}));
  } catch (e) {
    res.status(400).send(new ApiResponse(400, 'error', { errors: [e.message] }));  
  }
};

export const getProducts = async (req, res, next) => {
  const sellerId = req.query.sellerId;
  const query = {};

  if (sellerId) {
    const userExist = await User.findById(req.query.sellerId);
    if (!userExist) {
      res.status(400).send(new ApiResponse(400, 'error', { errors: ['SellerId not found'] })); 
    }
    query['sellerId'] = req.query.sellerId;
  }
  try {
    const products = await Product.find(query);
    res.status(200).send(new ApiResponse(200, 'success', products));
  } catch (e) {
    res.status(500).send(new ApiResponse(500, 'error', { errors: [e.message] })); 
  }
}

export const removeProductById = async (req, res, next) => {
  try {
    const response = await Product.removeProductById(req.params.productId, req.user._id);
    res.status(200).send(new ApiResponse(200, 'success', response));
  } catch (e) {
    res.status(500).send(new ApiResponse(500, 'error', { errors: [e.message] })); 
  }
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


// export const getCategories = (req, res, next) => {
//     Product.aggregate([
//         { $group: { _id: "$category", count: { $sum: 1 } } },
//         { $project: { _id: 0, category: '$_id', count: 1 } }
//     ])
//         .then(result => {
//             res.status(200).send(new ApiResponse(200, 'success', result));
//         })
//         .catch(err => {
//             console.log(err.message);
//             res.status(500).send(new ApiResponse(500, 'error', err.message));
//         });
// };

// export const getProductsByCategory = (req, res, next) => {
//     Product.find({category: {$regex: req.params.category, $options:"i" }})
//         .then(products => {
//             console.log(products);
//             res.status(200).send(new ApiResponse(200, 'success', products));
//         })
//         .catch(err => {
//             res.status(500).send(new ApiResponse(500, 'error', err));
//         });
// };
