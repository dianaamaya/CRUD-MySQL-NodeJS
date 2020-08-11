const { Router } = require('express');
const router = Router();
const passport = require('passport');

// controllers
const { register, login, logout } = require('../controllers/authentication.controller');

// sign up a user
router.route('/signup')
    .post( register );

// sign in a user
router.route('/signin')
    .post( login );

// log out a user
router.route('/logout')
    .get( logout );

module.exports = router;