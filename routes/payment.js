const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment'); // Assuming you have a Payment model

// Create payment for an order
router.post('/payment', async (req, res) => {
  try {
    const { orderId, amount, status } = req.body;
    const payment = new Payment({ orderId, amount, status });
    await payment.save();
    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payment by ID
router.get('/payment/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all payments for a user
router.get('/payments/user/:userId', async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payment status (for refund/failure handling)
router.put('/payment/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.json({ message: 'Payment status updated', payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
