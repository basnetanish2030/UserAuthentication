const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/signup', authController.showSignup);
router.post('/signup', authController.signup);

router.get('/login', authController.showLogin);
router.post('/login', authController.login);

module.exports = router;
