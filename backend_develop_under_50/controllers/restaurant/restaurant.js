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

let getRestaurant = async (req,res) => {
    let id = req.params.id;
    try{
        let restaurant = await Restaurant.findOne({'_id':id});
        let items = await Item.findOne({'restaurant':restaurant._id})
        res.status(200).json({
            "success":true,
            restaurant,
            items
        })
    }
    catch(e){
        res.status(400).json({
            "success":false,
            "error": e
        })
    }
}

let getRestaurantByName = async (req,res) => {
    let name = req.params.name.split('%20').join(" ");
    console.log(name);
    try{    
        let restaurant = await Restaurant.find({$text:{$search:name}});
        res.status(200).json({
            "success": true,
            restaurant
        })
    }
    catch(e){
        res.status(400).json({
            "success": false,
            "error": e
        })
    }

}



module.exports = {addItem, getAllRestaurants, getRestaurant, getRestaurantByName}