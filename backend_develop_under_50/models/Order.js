const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    item: {
        type: String
    },
    quantity: {
        type: Number
    },
    itemId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item'
    },
    unitPrice: {
        type: Number
    }
})

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurantId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    items: [cartItemSchema],
    final_amount: {type: Number, required: true},
}, {
    timestamps: true
});

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;