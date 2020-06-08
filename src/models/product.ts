import { Schema, model, Types } from 'mongoose';

const productSchema = new Schema({
  name: {
    type: String,
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

const Product = model('Product', productSchema);
export default Product;