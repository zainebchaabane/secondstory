const mongoose = require('mongoose');

const exchangeSchema = new mongoose.Schema({
   exchangeDate: { type: Date, default: Date.now }, // Date of the exchange request
   product1Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // First product involved in exchange
   product2Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Second product involved in exchange
   userId1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID of the person who owns product1
   userId2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User ID of the person who owns product2
   exchangeStatus: { 
      type: String, 
      enum: ['accepted', 'rejected', 'pending', 'closed'], // Valid statuses for exchange
      default: 'pending' 
   }
}, { timestamps: true });

const Exchange = mongoose.model('Exchange', exchangeSchema);

module.exports = Exchange;
