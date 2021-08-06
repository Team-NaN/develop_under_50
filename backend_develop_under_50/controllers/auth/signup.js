const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');
const admin = require('../../config/firebaseInit');
const { generateToken } = require('../../utils');
const signup = async (req, res, next) => {
    try {
        const idToken = req.header('Authorization').replace('Bearer ', '');
        admin.auth().verifyIdToken(idToken).then((decodedToken) => {
            const uid = decodedToken.uid;
            if (req.body.role === 'user') {
                const newUser = new User({
                    _id: decodedToken.uid,
                    email: decodedToken.email,
                });
                await newUser.save();
                const accessToken = generateToken(role, newUser._id).accessToken;
                res.cookie('accessToken', accessToken, { httpOnly: true });
                res.status(201).json({ success: true, message: 'Signup Successfull' });
            }
            else if (req.body.role === 'restaurant') {
                const newRestaurant = new Restaurant({
                    _id: decodedToken.uid,
                    email: decodedToken.email,
                });
                await newRestaurant.save();
                const accessToken = generateToken(role, newRestaurant._id).accessToken;
                res.cookie('accessToken', accessToken, { httpOnly: true });
                res.status(201).json({ success: true, message: 'Signup Successfull' });
            }

        }).catch((error) => {
            console.log(error);
            return res.status(401).json({ success: false, message: 'User Not Authorized' });
        });;

    } catch (error) {
        console.log(error);
        return res.status(504).json({ error: error.message });
    }

};
module.exports = signup;
