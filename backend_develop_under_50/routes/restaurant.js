var express = require('express');
var router = express.Router();
var { addItem, getAllRestaurants, getRestaurant, getRestaurantByName } = require('../controllers/restaurant/restaurant.js');
/* GET users listing. */
const authMiddleware = require('../middleware/auth');
// router.post('/add/new',);

router.post('/add/item', authMiddleware, addItem);

router.get('/get/all', authMiddleware, getAllRestaurants);

router.get('/get/id/:id', authMiddleware, getRestaurant);

router.get('/get/name/:name', authMiddleware, getRestaurantByName);

module.exports = router;
