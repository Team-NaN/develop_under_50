var express = require('express');
var router = express.Router();
var {updateCart, getCart, generateOrder, getInvoice, getAllOrders} = require('../controllers/user/user');
/* GET users listing. */
router.get('/signup', function(req, res, next) {
  
});

router.post('/update/cart', updateCart);

router.get('/get/cart', getCart);

router.post('/place/order', generateOrder);

router.post('/get/invoice', getInvoice);

router.get('/get/all/order', getAllOrders)

module.exports = router;
