import { Schema, model, Types } from 'mongoose';

const addressSchema = new Schema({
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  }
}, {strict: false});

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
  role: {
    type:String,
    required:true,
   // enum: ['ADMIN', 'SELLER', 'BUYER']
  },
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
  },
  address: {
    type: addressSchema,
  }
});

userSchema.methods.updateCart = async function(prodId, quant) {
  if (quant === 0) {
    this.cart.items = this.cart.items.filter(item => item.productId.toString() !== prodId);
  }
  else {
    let item = this.cart.items.find(item => item.productId.toString() === prodId);

    if (item === undefined) {
      this.cart.items.push({productId: prodId, quantity: quant});
    }
    else {
      item.quantity = quant;
    }
  }
  await this.save();
}

const User = model('User', userSchema);
export default User;