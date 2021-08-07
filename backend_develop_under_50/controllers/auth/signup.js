const User = require('../../models/User');
const Restaurant = require('../../models/Restaurant');
const admin = require('../../config/firebaseInit');
const { generateToken } = require('../../Utils/generateToken');
const signup = async (req, res, next) => {
    try {
        const idToken = req.header('Authorization').replace('Bearer ', '');
        admin.auth().verifyIdToken(idToken).then(async (decodedToken) => {
            console.log('Came inside singup');
            const uid = decodedToken.uid;
            console.log(decodedToken.email);
            console.log(req.body.role);
            if (req.body.role === 'user') {
                const newUser = new User({
                    uid: uid,
                    email: decodedToken.email,
                    name: req.body.name
                });
                newUserRes = await newUser.save();
                console.log(newUserRes);
                const accessToken = await generateToken(req.body.role, newUser._id).accessToken;
                console.log(accessToken);
                res.cookie('accessToken', accessToken, { httpOnly: true });
                return res.status(201).send({ success: true, message: 'Signup Successfull', user: newUserRes });
            }
            else if (req.body.role === 'restaurant') {
                const newRestaurant = new Restaurant({
                    uid: decodedToken.uid,
                    email: decodedToken.email,
                    name: req.body.name
                });
                const newRestaurantRes = await newRestaurant.save();
                const accessToken = await generateToken(req.body.role, newRestaurant._id).accessToken;
                res.cookie('accessToken', accessToken, { httpOnly: true });
                return res.status(201).send({ success: true, message: 'Signup Successfull', restaurant: newRestaurant });

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
