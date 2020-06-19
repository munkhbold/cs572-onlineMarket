import { Schema, model, Types } from 'mongoose';


const paymentSchema = new Schema({
    orderId: {
        type: Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    clientId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cartInfo: {
        number: String,
        expireDate: String,
        cvv: Number
    },
    createdAt: {
        type: Date,
        default: new Date,
    },
    point: Number,
    totalPrice: Number
});

const Payment = model('Payment', paymentSchema);
export default Payment;