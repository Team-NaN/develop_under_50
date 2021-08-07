const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    items: {
        type: [{
            itemId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Item',
                required: true,
            },
            quantity: {
                type: Number,
                required: true
            }
        }],
        required: false
    },
    amount: {
        type: Number,
        required: false
    },

}, {
    timestamps: true
});
module.exports = cartSchema;
// const Cart = new mongoose.model('Cart', cartSchema);