const mongoose = require('mongoose');
const pointSchema = require('./GeoPoint');
const restaurantSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
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

restaurantSchema.index({ name: "text" });

const Restaurant = new mongoose.model('Restaurant', restaurantSchema);



module.exports = Restaurant;