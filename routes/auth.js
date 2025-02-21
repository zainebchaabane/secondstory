const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// User signup
router.post('/register', authController.signup);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authController.logout);

// Check authentication status
router.get('/check', authController.checkAuth);

module.exports = router;
