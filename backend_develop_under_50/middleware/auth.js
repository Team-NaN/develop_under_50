const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const { parseCookies } = require('../Utils/parseCookies');

const auth = async (req, res, next) => {

    try {
        console.log('came inside middleware');
        const token = parseCookies(req).accessToken;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET, { algorithm: "HS256" });
        if (decoded.role === 'restaurant') {
            const restaurant = await Restaurant.findOne({ _id: decoded.id });
            if (!restaurant) {
                throw new Error();
            }
            req.restaurant = restaurant;
        } else if (decoded.role === 'user') {
            const user = await User.findOne({ _id: decoded.id });
            if (!user) {
                throw new Error();
            }
            req.user = user;
        }
        next();

    } catch (err) {
        console.log(err.message);
        res.status(401).send({ message: 'NOTOKEN', err: err });
    }



};

module.exports = auth;