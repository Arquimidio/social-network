const express = require('express');
const router = express.Router();
const authControllers = require('../Controllers/auth');

router.route('/signup')
    .get(authControllers.signup_get)
    .post(authControllers.signup_post)

router.route('/login')
    .get(authControllers.login_get)
    .post(authControllers.login_post)

router.route('/logout')
    .get(authControllers.logout_get)

module.exports = router;