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
    }
})

const cartSchema = new mongoose.Schema({
    restaurantId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        default: null
    },
    items: [cartItemSchema],
}, {
    timestamps: true
});

// const Cart = new mongoose.model('Cart', cartSchema);
module.exports = cartSchema;