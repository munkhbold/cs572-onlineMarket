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


const Product = model('Product', productSchema);
export default Product;