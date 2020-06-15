import { Product, User, Order } from '../models';
import { ApiResponse } from '../utils/response';

export const insertProduct = (req, res, next) => {
    User.findById(req.user._id)
        .then(seller => {
            return Product.create({
                name: req.body.name,
                category: req.body.category,
                sellerId: seller._id,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                unitPrice: req.body.unitPrice,
                qty: req.body.qty
            })
        })
        .then(() => {
            res.status(201).send(new ApiResponse(201, 'success', { message: 'This product is added by the current seller.' }));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

export const getProductById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(result => {
            res.status(200).send(new ApiResponse(200, 'success', result));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

export const patchProductById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            for (let i in req.body) {
                product[i] = req.body[i];
            }
            return product.save();
        })
        .then(() => {
            res.status(200).send(new ApiResponse(200, 'success', { message: 'The product is updated.' }));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
};

export const listProducts = (req, res, next) => {
    Product.find({ sellerId: req.user._id })
        .then(products => {
            res.status(200).send(new ApiResponse(200, 'success', products));
        })
        .catch(err => {
            res.status(500).send(new ApiResponse(500, 'error', err));
        });
}

// export const removeProductById =  (req, res, next) => {
//     Product.findByIdAndDelete(req.params.productId)
//         .then(() => {
//             res.status(200).send(new ApiResponse(200, 'success', {message:'The product is deleted.'}));
//         })
//         .catch(err => {
//             res.status(500).send(new ApiResponse(500, 'error', err));
//         });
// };

//If the poduct was purchased, then can not delete
export const removeProductById = async (req, res, next) => {
    try {
        const order = await Order.findOne({ status: 'recieved', "items.productid": req.params.productId, sellerId: req.user._id });
        if (order) {
            res.status(401).send(new ApiResponse(401, 'error', { err: 'The product was already purchased, so could not delete' }));
        } else {
            await Product.findByIdAndDelete(req.params.productId);
            res.status(200).send(new ApiResponse(200, 'success', { message: 'The product is deleted.' }));
        }
    } catch (err) {
        res.status(500).send(new ApiResponse(500, 'error', err));
    }
};

export const orderCancel = (req, res, next) => {
    Order.findById(req.params.id)
        .then((order) => {
            order.status = "canceled";
            return order.save();
        })
        .then(() => {
            res.send(new ApiResponse(200, 'success', { message: 'The order status is canceled by the Seller.' }));
        })
        .catch(() => {
            res.status(404).send(new ApiResponse(500, 'error', { message: 'Order is not found.' }));
        });
};

export const statusChange = (req, res, next) => {
    Order.findById(req.params.id)
        .then((order) => {
            order.status = req.body.status;
            return order.save();
        })
        .then(() => {
            res.send(new ApiResponse(200, 'success', { message: 'The order status is changed by the Seller.' }));
        })
        .catch(() => {
            res.status(404).send(new ApiResponse(500, 'error', { message: 'Order is not found.' }));
        });
};

export const ordersForSeller = (req, res, next) => {
    Order.find({ sellerId: req.user._id })
        .then((orders) => {
            res.send(new ApiResponse(200, 'success', orders));
        })
        .catch(() => {
            res.status(404).send(new ApiResponse(500, 'error', { message: 'Orders are not found.' }));
        });
};
