var mongoose = require('mongoose');
var Restaurant = require('../../models/Restaurant');
var Item = require('../../models/Item');

let addItem = async (req,res) => {
    var data = req.body;
    data.restaurant = req.body.restaurantid;
    try{
        let item = new Item(data);
        await item.save();
        res.status(201).json({
            "success": true,
            "msg": "Item added Successfully!"
        })
    }
    catch(e){
        res.status(400).json({
            "success": false,
            "error": e 
        })
    }
}

let getAllRestaurants= async (req,res) =>{
    try{  
        let restaurants = await Restaurant.find();
        res.status(200).json({
            "success": true,
            restaurants
        })
    }
    catch(e){
        res.status(400).json({
            "success": false,
            "error": e
        })
    }
}




module.exports = {addItem, getAllRestaurants}