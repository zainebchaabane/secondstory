const Donation = require('../models/donation');

// Get all donations (populate product details)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('productId');
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve donations', details: err.message });
  }
};

// Get a donation by ID (populate product details)
exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('productId');
    if (!donation) return res.status(404).json({ error: 'Donation not found' });
    res.status(200).json(donation);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching donation', details: err.message });
  }
};

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    const newDonation = new Donation({ productId });
    await newDonation.save();

    res.status(201).json({ message: 'Donation created successfully', donation: newDonation });
  } catch (err) {
    res.status(400).json({ error: 'Error creating donation', details: err.message });
  }
};

// Update a donation
exports.updateDonation = async (req, res) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('productId');

    if (!updatedDonation) return res.status(404).json({ error: 'Donation not found' });

    res.status(200).json({ message: 'Donation updated successfully', donation: updatedDonation });
  } catch (err) {
    res.status(400).json({ error: 'Error updating donation', details: err.message });
  }
};

// Delete a donation
exports.deleteDonation = async (req, res) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
    if (!deletedDonation) return res.status(404).json({ error: 'Donation not found' });

    res.status(200).json({ message: 'Donation deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting donation', details: err.message });
  }
};