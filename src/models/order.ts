import { Schema, model, Types } from 'mongoose';
import { Product } from './';

const orderSchema = new Schema({
  clientId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  sellerId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: { // ordered, shipped, received, canceled
    type: String,
    default: 'ordered'
  },
  billingAddress: {
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
  },
  shippingAddress: {
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
  },
  items: [{
    productId: {
      type: Types.ObjectId,
      ref: 'Product',
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create order in each seller
const createOrder = async(items, seller, user, billingAddress, shippingAddress)=>{
  const newItems = []
  let totalPrice = 0;
  for(let product of seller.products){
    const quantity = items.find(i=>i.productId.toString() == product.id.toString()).quantity;
    totalPrice += quantity * product.unitPrice;
    newItems.push({
      quantity: quantity,
      productId: product.id,
      unitPrice: product.unitPrice
    });
  }

  return Order.create({
    clientId: user._id,
    sellerId: seller.sellerId,
    items: newItems,
    billingAddress,
    shippingAddress,
    totalPrice,
  });
}

orderSchema.statics.placeOrder =  async (user, billingAddress, shippingAddress)=>{
  if(billingAddress == null && user.address == null){
    throw new Error("Billing address is required");
  }

  if(billingAddress == null && user.address != null){
    billingAddress = user.address;
  }

  const cartItems = user.cart.items;
  const productIds = cartItems.map(item=>item.productId);
  // Group by seller id
  const sellers = await Product.aggregate([
    {$match: { _id: {$in: productIds}}},
    {$group: {
      _id: "$sellerId",
      products: {$push: {id: '$_id', unitPrice: '$unitPrice'}}
      }
    },
    {$project: { sellerId: '$_id', _id: 0, products: 1}}
  ]);

  for(let seller of sellers){
    await createOrder(cartItems, seller, user, billingAddress, shippingAddress);
  }
}

const Order = model('Order', orderSchema);
export default Order;