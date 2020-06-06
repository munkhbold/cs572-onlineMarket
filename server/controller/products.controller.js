const Product = require('../models/products.model');

exports.insert = (req, res, next) => {
    Product.create(req.body)
        .then(result => {
            res.status(201).send({ id: result._id });
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};

exports.patchById = (req, res, next) => {
    Product.findById(req.params.productId)
        .then(product => {
            for (let i in req.body) {
                product[i] = req.body[i];
            }
            return product.save();
        })
        .then(result => {
            res.status(204).send({});
        });
};

exports.list = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(200).send(products);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
}

exports.removeById = (req, res, next) => {
    Product.findByIdAndDelete(req.params.productId)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};

exports.getNoOfProductsInRole = (req, res, next) => {
    Product.aggregate([
            { $group: { _id: "$role", sum_products: { $sum: 1 } } }
        ])
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send({ errMsg: err });
        });
};