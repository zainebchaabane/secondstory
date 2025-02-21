const express = require('express');
const donationController = require('../controllers/donation.controller');

const router = express.Router();

// Get all donations (with populated product details)
router.get('/', donationController.getAllDonations);

// Get a single donation by ID (with populated product details)
router.get('/:id', donationController.getDonationById);

// Create a new donation (Requires a valid productId)
router.post('/', donationController.createDonation);

// Update an existing donation
router.put('/:id', donationController.updateDonation);

// Delete a donation
router.delete('/:id', donationController.deleteDonation);

module.exports = router;