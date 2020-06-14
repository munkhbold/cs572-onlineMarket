import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
  name: {
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
  imageUrl: String,
  isApproved: {
    type: Boolean,
    default: false
  },
  unitPrice: {
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
  if (!product) throw new Error("Product not found to add in cart");
  product.isApproved = true;
  return product.save();
}

const Product = model('Product', productSchema);
export default Product;