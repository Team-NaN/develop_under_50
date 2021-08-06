var express = require('express');
var router = express.Router();
var { addItem, getAllRestaurants} = require('../controllers/restaurant/restaurant.js');
/* GET users listing. */

router.post('/add/new', );

router.post('/add/item', addItem);

router.get('/get/all', getAllRestaurants);

module.exports = router;
