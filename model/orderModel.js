const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema({
    orderItemsIds: [
        {
            type: ObjectId,
            ref: 'OrderItems',
            required: true
        }
    ],
    total: {
        type: Number,
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    shipping_adress: {
        type: String,
        required: true
    },
    alternate_shipping_adress: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    }
}, { timestamps: true })


module.exports = mongoose.model("Order", orderSchema)
