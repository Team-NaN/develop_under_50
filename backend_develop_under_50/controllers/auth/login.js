const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');
const admin = require('../../config/firebaseInit');
const { generateToken } = require('../../utils');
const login = async (req, res, next) => {
    try {
        const idToken = req.header('Authorization').replace('Bearer ', '');
        admin.auth().verifyIdToken(idToken).then((decodedToken) => {
            const uid = decodedToken.uid;
            if (req.body.role === 'user') {
                const existingUser = await User.findOne({ _id: uid });
                if (!existingUser)
                    return res.status(401).json({ success: false, message: 'User Not Authorized' });
                const accessToken = generateToken(role, newUser._id).accessToken;
                res.cookie('accessToken', accessToken, { httpOnly: true });
                res.status(200).json({ success: true, message: 'Login Successfull', user: existingUser });
            }
            else if (req.body.role === 'restaurant') {
                const existingRestaurant = await Restaurant.findOne({ _id: uid });
                if (!existingRestaurant)
                    return res.status(401).json({ success: false, message: 'Restaurant Not Authorized' });
                res.cookie('accessToken', accessToken, { httpOnly: true });
                res.status(201).json({ success: true, message: 'Login Successfull', restaurant: existingRestaurant });
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
module.exports = login;
