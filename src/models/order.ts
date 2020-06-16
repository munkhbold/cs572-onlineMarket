import { Schema, model, Types } from 'mongoose';
import { Product } from './';
import { ORDER_STATUS } from '../constants'

const STATUSES = [ORDER_STATUS.CANCELED, ORDER_STATUS.ORDERED, ORDER_STATUS.RECEIVED, ORDER_STATUS.SHIPPED]

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
  status: {
    type: String,
    enum: STATUSES,
    default: ORDER_STATUS.ORDERED
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

orderSchema.statics.updateOrderStatus = async (orderId, userId, changeStatus)=> {

  if (!STATUSES.find(status => status === changeStatus)) throw new Error('Status not found!');

  const order = await Order.findById(orderId);

  if (!order) throw new Error(`Can't find order with id ${orderId}`);

  if (order.clientId.toString() !== userId.toString() && order.sellerId.toString() !== userId.toString()) 
    throw new Error(`Cant't find order with buyerId or sellerId ${userId}`);
  
    
  if (order.status === ORDER_STATUS.CANCELED) throw new Error('Order has been already canceled!')

  if (changeStatus === ORDER_STATUS.CANCELED && order.status !== ORDER_STATUS.ORDERED) 
    throw new Error(`Order already has been proceeded`);

  order.status = changeStatus;
  
  return order.save();
}

const Order = model('Order', orderSchema);
export default Order;