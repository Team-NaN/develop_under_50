const mongoose = require('mongoose');
const pointSchema = require('../../models/GeoPoint');
const userDetails = async (req, res, next) => {
    try {
        if (req.body.name) {
            req[req.role].name = req.body.name;
        }
        if (req.body.profile) {
            req[req.role].profile = req.body.profile;
        }
        if (req.body.address) {
            req[req.role].address = req.body.address;
        }
        if (req.body.city) {
            req[req.role].city = req.body.city;
        }
        if (req.body.state) {
            req[req.role].state = req.body.state;
        }
        if (req.body.country) {
            req[req.role].country = req.body.country;
        }
        if (req.body.cordinates) {
            const Point = new mongoose.model('Point', pointSchema);
            const point = new Point({
                type: 'Point',
                coordinates: req.body.cordinates
            });
            req[req.role].location = point;
            console.log(point);
        }
        const updateRes = await req[req.role].save();
        console.log(updateRes);
        res.status(200).json({ success: true, message: 'Details Updated succesfully', user: updateRes });

    } catch (error) {
        console.log(error);
        res.status(504).json({ success: false, error: error });
    }

};

module.exports = userDetails;