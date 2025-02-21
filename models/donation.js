const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product model
   donationDate: { type: Date, default: Date.now } // Automatically sets the donation date
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
