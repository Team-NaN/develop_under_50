var express = require('express');
var router = express.Router();
var { updateCart } = require('../controllers/user/user');
const authMiddleware = require('../middleware/auth');
const userDetails = require('../controllers/user/userDetails');
var { updateCart, getCart, generateOrder, getInvoice, getAllOrders } = require('../controllers/user/user');
/* GET users listing. */
router.get('/signup', function (req, res, next) {

});
router.put('/userDetails', authMiddleware, userDetails);
router.post('/update/cart', authMiddleware, updateCart);

router.get('/get/cart', authMiddleware,getCart);

router.post('/place/order', authMiddleware, generateOrder);

router.post('/get/invoice', authMiddleware, getInvoice);

router.get('/get/all/order', authMiddleware, getAllOrders);

module.exports = router;
