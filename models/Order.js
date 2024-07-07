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
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'users'
        },
        order_code: { type: String, index: { unique: true } },
        address: {
            body: String,
            lat: String,
            lng: String
        },
        total_price: { type: Number, default: 0 },
        payment_method: { type: String, enum: ['DEBIT', 'CREDIT', 'CASH', 'PIX'] },
        status: {
            type: String,
            enum: ['pending', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'completed', 'canceled'],
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

const fetchOrders = async () => {
    const midnigth = new Date().setHours(0, 0, 0, 0);
    const currDate = new Date();

    const orders = await Order
        .find({
            createdAt: {
                $gte: midnigth,
                $lte: currDate
            }
        })
        .populate('user', 'name phone')
        .select({
            '__v': 0,
            'updatedAt': 0,
        })
        .then(data => data.map(el => el.toObject()));

    const statusLabel = {
        'pending': 'Pendente',
        'confirmed': 'Confirmado',
        'preparing': 'Preparando',
        'ready_for_pickup': 'Pronto para retirada',
        'out_for_delivery': 'Saiu para entrega',
        'delivered': 'Entregue',
        'completed': 'Completo',
        'canceled': 'Cancelado'
    }

    const statusPayment = {
        'DEBIT': 'Débito',
        'CASH': 'Dinheiro',
        'CREDIT': 'Crédito',
        'PIX': 'Pix',
    }

    const result = orders.map(el => {
        const status = el.status;
        const payment = el.payment_method;
        el.statusLabel = statusLabel[status];
        el.paymentLabel = statusPayment[payment];

        return el;
    });

    return result;
}

const editOrder = async (id, order) => {
    return await Order
        .findByIdAndUpdate(id, order)
        .select({ '__v': 0, 'updatedAt': 0 });
}

module.exports = {
    fetchOrders,
    editOrder
}