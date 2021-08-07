var express = require('express');
var router = express.Router();
var {updateCart} = require('../controllers/user/user');
/* GET users listing. */
router.get('/signup', function(req, res, next) {
  
});

router.post('/update/cart', updateCart);

module.exports = router;
