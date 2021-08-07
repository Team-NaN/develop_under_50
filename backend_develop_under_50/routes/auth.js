const auth = require('express').Router();
const signup = require('../controllers/auth/signup');
const login = require('../controllers/auth/login');
const authMiddleware = require('../middleware/auth');
const continueIfAuthenticated = require('../controllers/auth/continueIfAuthenticated');
auth.post('/signup', signup);
auth.post('/login', login);
auth.get('/continueIfAuthenticated', authMiddleware, continueIfAuthenticated);
module.exports = auth;