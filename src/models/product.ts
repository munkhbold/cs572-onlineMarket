import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength:4,
    maxlength:30
  },
  category: {
    type: String,
    required: true
  },
  sellerId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: Object,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  unitPrice: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  star: {
    totalRating: Number,
    totalVote: Number
  },
  reviews: [{
    clientId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    isShow: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

productSchema.statics.approveProduct = async function(prodId) {
  const product = await Product.findById(Types.ObjectId(prodId));

  if (!product) throw new Error("Product not found to approve");
  product.isApproved = true;
  
  return product.save();
}

productSchema.statics.addReview = async function(userId, prodId, comment) {
  const product = await Product.findById(Types.ObjectId(prodId));
  
  if (!product) throw new Error("Product not found to add review");
  product.reviews.push({clientId: userId, comment: comment})
  
  return product.save();
}

productSchema.statics.approveReview = async function(prodId, reviewId) {
  const product = await Product.findById(Types.ObjectId(prodId));
  
  if (!product) throw new Error("Product not found to approve review");

  let review = product.reviews.find(review => review._id.toString() === reviewId);
  if (review === undefined) throw new Error("Review not found to approve review");
  review.isShow = true;
  
  return product.save();
}

const Product = model('Product', productSchema);
export default Product;