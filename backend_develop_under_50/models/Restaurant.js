const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
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

restaurantSchema.index({ name: "text"})

restaurantSchema.plugin(mongoose_fuzzy_searching, { fields: ['name'] });

const Restaurant = new mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;