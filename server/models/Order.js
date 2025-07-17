import mongoose from "mongoose";
import Address from "./Address.js";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' },
        quantity: { type: Number, required: true }
    }],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Order Placed' },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);

export default Order;