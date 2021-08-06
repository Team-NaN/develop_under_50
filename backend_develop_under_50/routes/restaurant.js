var express = require('express');
var router = express.Router();
var { addItem, getAllRestaurants, getRestaurant, getRestaurantByName} = require('../controllers/restaurant/restaurant.js');
/* GET users listing. */

router.post('/add/new', );

router.post('/add/item', addItem);

router.get('/get/all', getAllRestaurants);

router.get('/get/id/:id', getRestaurant);

router.get('/get/name/:name', getRestaurantByName);

module.exports = router;
