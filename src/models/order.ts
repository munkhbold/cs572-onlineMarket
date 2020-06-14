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

orderSchema.statics.placeOrder =  async (user, billingAddress, shippingAddress)=>{
  if(billingAddress == null && user.address == null){
    throw new Error("Billing address is required");
  }

  if(billingAddress == null && user.address != null){
    billingAddress = user.address;
  }

  const items = user.cart.items;
  const productIds = items.map(item=>item.productId);
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

  let totalPrice = 0;
  let newItems = [];
  // Create order in each seller
  for(let seller of sellers){
    newItems = []
    for(let product of seller.products){
      const quantity = items.find(i=>i.productId.toString() == product.id.toString()).quantity;
      totalPrice += quantity * product.unitPrice;
      newItems.push({
        quantity: quantity,
        productId: product.id,
        unitPrice: product.unitPrice
      });
    }

    await Order.create({
      clientId: user._id,
      sellerId: seller.sellerId,
      items: newItems,
      billingAddress,
      shippingAddress,
      totalPrice,
    });
  }
}

const Order = model('Order', orderSchema);
export default Order;