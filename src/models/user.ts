import { Schema, model, Types } from 'mongoose';
import config from '../config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { USER_ROLES } from '../constants';

const ROLES = [USER_ROLES.ADMIN, USER_ROLES.BUYER, USER_ROLES.SELLER];

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
    type: String,
    enum: ROLES,
    default: USER_ROLES.BUYER
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

const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

const validatePassword = (password: string) => {
  const res = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return res.test(password);
}

userSchema.statics.createUser = async function(email: string, password: string, role: string){
  if (!validateEmail(email))
    throw new Error('Email is incorrect');

  if (await User.exists({ email }))
    throw new Error('Email is already registered');
  

  if (!validatePassword(password)){
    throw new Error(`The password must contains at least a number and 6 letters`)
  }

  if( ROLES.indexOf(role) == -1 )
    throw new Error('Role is incorrect');
  
  const hashPwd = await bcrypt.hash(password, 10);
  return User.create({
    email: email.toLowerCase(),
    password: hashPwd,
    role
  });
}

userSchema.statics.authenticate = async function(email: string, password: string){
  const user = await User.findOne({ email: email });
  if( !user )
    throw new Error('Username or password is not correct');

  const isValid = await bcrypt.compare(password, user.password);
  if( !isValid )
    throw new Error('Username or password is not correct');

  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
    point: !user.point ? 0 : user.point,
    firstname: user.firstname,
    lastname: user.lastname
  }

  const token = jwt.sign({payload}, config.jwtKey, {
    expiresIn: config.jwtExpirySeconds
  });

  return {
    token: token, 
    expiresIn: config.jwtExpirySeconds, 
    user: user };
}

const User = model('User', userSchema);
export default User;