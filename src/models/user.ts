import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastname: String,
  firstname: String,
  point: Number,
  role: String,
  cart: {
    items: [ {
      productId: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }],
    totalPrice: Number
  }
});

const User = model('User', userSchema);
export default User;