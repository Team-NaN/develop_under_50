const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Item',
        required: true
    },
    category: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});



const Item = new mongoose.model('Item', itemSchema);
module.exports = Item;