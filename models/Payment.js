const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true, enum: ['CreditCard', 'Cash'] },
  paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  paymentDate: { type: Date, required: true },
}, { 
  timestamps: true,
  discriminatorKey: 'paymentMethod' // Key to differentiate payment methods
});

const Payment = mongoose.model('Payment', paymentSchema);

// CreditCard Schema (inherits from Payment)
const creditCardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true },
  expiryDate: { type: Date, required: true },
  cvv: { type: String, required: true }
});
const CreditCard = Payment.discriminator('CreditCard', creditCardSchema);

// Cash Schema (inherits from Payment)
const cashSchema = new mongoose.Schema({
  amountReceived: { type: Number, required: true } // Ensures the cash amount is provided
});
const Cash = Payment.discriminator('Cash', cashSchema);

module.exports = { Payment, CreditCard, Cash };
