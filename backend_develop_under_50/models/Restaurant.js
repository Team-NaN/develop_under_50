const mongoose = require('mongoose');
const pointSchema = require('./GeoPoint');
const restaurantSchema = new mongoose.Schema({

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
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('Email provided is wrong');
            }
        }
    },
    password: {
        type: String,
        required: false,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password Must not include the word "password"');
            }
        }
    },
    profile: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: pointSchema,
        index: '2dsphere',
        required: true
    }
}, {
    timestamps: true
});


const Restaurant = new mongoose.model('Restaurant', restaurantSchema);



module.exports = Restaurant;