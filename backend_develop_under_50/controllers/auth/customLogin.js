const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');
const admin = require('../../config/firebaseInit');
const { generateToken } = require('../../Utils/generateToken');
const customLogin = async (req, res, next) => {
    try {
        const idToken = req.header('Authorization').replace('Bearer ', '');
        admin.auth().verifyIdToken(idToken).then(async (decodedToken) => {
            const uid = decodedToken.uid;
            const existingUser = await User.findOne({ uid: uid });
            const existingRestaurant = await Restaurant.findOne({ uid: uid });
            if (req.body.role === 'user') {
                if (existingRestaurant !== null)
                    return res.status(401).send({ success: false, message: 'You previously logged in as restaurant' });
                if (!existingUser) {
                    const newUser = new User({
                        uid: uid,
                        email: decodedToken.email,
                        name: decodedToken.name
                    });
                    newUserRes = await newUser.save();
                    console.log(newUserRes);
                    const accessToken = await generateToken(req.body.role, newUser._id).accessToken;
                    console.log(accessToken);
                    res.cookie('accessToken', accessToken, { httpOnly: true });
                    return res.status(201).send({ success: true, message: 'Signup Successfull', user: newUserRes });
                }
                const accessToken = await generateToken(req.body.role, existingUser._id).accessToken;
                res.cookie('accessToken', accessToken, { httpOnly: true });
                return res.status(200).json({ success: true, message: 'Login Successfull', user: existingUser });
            }
            else if (req.body.role === 'restaurant') {

                if (!existingRestaurant) {
                    if (existingUser !== null)
                        return res.status(401).send({ success: false, message: 'You previously logged in as user' });

                    const newRestaurant = new Restaurant({
                        uid: decodedToken.uid,
                        email: decodedToken.email,
                        name: req.body.name
                    });
                    const newRestaurantRes = await newRestaurant.save();
                    const accessToken = await generateToken(req.body.role, newRestaurant._id).accessToken;
                    res.cookie('accessToken', accessToken, { httpOnly: true });
                    return res.status(201).send({ success: true, message: 'Signup Successfull', restaurant: newRestaurantRes });
                }
                const accessToken = await generateToken(req.body.role, existingRestaurant._id).accessToken;

                res.cookie('accessToken', accessToken, { httpOnly: true });
                return res.status(200).json({ success: true, message: 'Login Successfull', restaurant: existingRestaurant });
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
module.exports = customLogin;
