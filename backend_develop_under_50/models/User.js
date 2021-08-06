const mongoose = require('mongoose');
const validator = require('validator');
const cartSchema = require('./Cart');
const pointSchema = require('./GeoPoint');
const userSchema = new mongoose.Schema({
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
        type: string,
        required: false
    },
    cart: {
        type: cartSchema
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


// userSchema.methods.toJSON = function () {
//     const user = this;
//     const userObject = user.toObject();
//     delete userObject.password;

//     delete userObject.avatar;
//     return userObject;
// };

// userSchema.methods.generateAuthToken = async function () {
//     const user = this;
//     const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

//     user.tokens = user.tokens.concat({ token: token });
//     await user.save();

//     return token;
// };

// userSchema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email });

//     if (!user) {
//         throw new Error('unable to Login');
//     }
//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//         throw new Error('Unable to Login');
//     }


// };



// // hash the plain text password before saving
// userSchema.pre('save', async function (next) {
//     const user = this;

//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }

//     next();
// });


// // delete user tasks when user delets profile
// userSchema.pre('remove', async function (next) {
//     const user = this;

//     await Task.deleteMany({ owner: user._id });

//     next();


// });

const User = new mongoose.model('User', userSchema);



module.exports = User;