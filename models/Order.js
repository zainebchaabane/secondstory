const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart', // Correct reference to the Cart model
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['accepted', 'in_preparation', 'shipped', 'delivered', 'cancelled', 'closed'],
  },
  shippedAt: {
    type: Date,
    default: null, // Corrected type definition
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
