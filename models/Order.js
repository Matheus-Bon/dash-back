const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    id: { type: mongoose.Schema.ObjectId },
    name: { type: String },
    quantity: { type: Number },
    total_price_product: { type: Number },
    flavors: [
        {
            id: { type: mongoose.Schema.ObjectId },
            name: { type: String },
            quantity: { type: Number },
            total_price_flavor: { type: Number },
        }
    ]
}, { _id: false })

const schema = new Schema(
    {
        order_code: { type: String, index: { unique: true } },
        address_id: { type: mongoose.Schema.ObjectId },
        total_price: { type: Number, default: 0 },
        payment_method: { type: String, enum: ['DEBIT', 'CREDIT', 'CASH', 'PIX'] },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'completed', 'canceled'],
            default: 'pending'
        },
        delivery: { type: Boolean, default: true },
        products: { type: [productSchema] }
    },
    {
        timestamps: true,
    }
);


const Order = mongoose.model("orders", schema);


module.exports = {

}