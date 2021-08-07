const mongoose = require('mongoose');
const cartSchema = require('./Cart');
const pointSchema = require('./GeoPoint');
const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: false,
    },
    profile: {
        type: String,
        required: false
    },
    cart: {
        type: cartSchema
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    location: {
        type: pointSchema,
        index: '2dsphere',
        required: false
    }
}, {
    timestamps: true
});

const User = new mongoose.model('User', userSchema);



module.exports = User;