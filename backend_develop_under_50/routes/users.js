var express = require('express');
var router = express.Router();
var { updateCart } = require('../controllers/user/user');
const authMiddleware = require('../middleware/auth');
const userDetails = require('../controllers/user/userDetails');
/* GET users listing. */
router.get('/signup', function (req, res, next) {

});
router.put('/userDetails', authMiddleware, userDetails);
router.post('/update/cart', authMiddleware, updateCart);

module.exports = router;
