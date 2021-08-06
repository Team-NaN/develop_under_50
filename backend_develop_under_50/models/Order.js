const mongoose = require('mongoose');

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
    items: {
        type: [{
            type: {
                itemId: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Item',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        }],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    pending: {
        type: Boolean,
        required: true,
        default: true
    }

}, {
    timestamps: true
});

const Order = new mongoose.model('Order', orderSchema);
module.exports = Order;