const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchange.controller');
const authenticateUser = require('../middleware/authMiddleware');  // Import the middleware

// Create a new exchange request
router.post('/', authenticateUser,exchangeController.createExchange);

// Update exchange status (accepted, rejected, closed)
router.put('/status',authenticateUser, exchangeController.updateExchangeStatus);

// Get the status of a specific exchange
router.get('/:exchangeId', exchangeController.getExchangeStatus);

// Get all exchanges for a specific user
router.get('/user/:userId', exchangeController.getExchangesByUser);

module.exports = router;