import mongoose, { Schema, model, Model } from "mongoose";
import { IOrder } from "../interfaces";

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    orderItems: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            title: { type: String, required: true },
            size: { type: String, required: true },
            quantity: { type: Number, required: true },
            slug: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
        }
    ],
    shippingAddress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        direction: { type: String, required: true },
        direction2: { type: String },
        code: { type: String, required: true },
        city: { type: String, required: true },
        phone: { type: String, required: true },
    },
    //payment
    numberOfItems: { type: Number, require: true },
    subTotal: { type: Number, require: true },
    tax: { type: Number, require: true },
    total: { type: Number, require: true },
    //status
    isPaid: { type: Boolean, require: true, default: false },
    paidAt: { type: String },

}, {
    timestamps: true
})

const Order: Model<IOrder> = mongoose.models.Order || model('Order', OrderSchema)

export default Order