var mongoose = require('mongoose');
var Restaurant = require('../../models/Restaurant');
var Item = require('../../models/Item');
var User = require('../../models/User');
var Cart = require('../../models/Cart');


let updateCart = async (req, res) => {
    try {
        let data = req.body;
        let uid = req.body.userid; //! delete afterwards
        //let user = req.user  //! uncomment afterwards
        let user = await User.findOne({
            '_id': uid
        }); //! delete afterwards
        if (data.restaurantId == user.cart.restaurantId || !user.cart.restaurantId) {
            user.cart.restaurantId = data.restaurantId;
            user.cart.items.forEach(e => {
                data.items.forEach(i => {
                    if (e.itemId == i.itemId) {
                        e.quantity += i.quantity;
                        data.items = data.items.filter(f => f != i);
                    }
                })
            })
            data.items.forEach(e => {
                user.cart.items.push({
                    'item': e.item,
                    'quantity': e.quantity,
                    'itemId': e.itemId
                });
            })
            await user.save();
            res.status(200).json({
                "success": true,
                "msg": "Cart Updated",
                "cart": user.cart
            })
        } else {
            res.status(400).json({
                "success": false,
                "error": "Restaurant ID Conflict"
            })
        }
    } catch (e) {
        res.status(400).json({
            "success": false,
            "error": e
        })
    }
}

module.exports = {
    updateCart
};