const Exchange = require('../models/exchange');
const User = require('../models/user');

// 1. Create a new exchange request
const { Product, Clothes, Book } = require('../models/product');

exports.createExchange = async (req, res) => {
    try {
        const { product1Id, product2Id } = req.body;
        const userId = req.userId;  

        if (!userId) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        // Fetch products from all discriminators
        const product1 = await Product.findById(product1Id) || await Clothes.findById(product1Id) || await Book.findById(product1Id);
        const product2 = await Product.findById(product2Id) || await Clothes.findById(product2Id) || await Book.findById(product2Id);

        if (!product1 || !product2) {
            return res.status(404).json({ message: 'One or both products not found' });
        }

        // Ensure the products belong to the user making the exchange request
        if (product1.ownerId.toString() == userId || product2.ownerId.toString() !== userId) {
            return res.status(403).json({ message: 'You cannot only your own products' });
        }

        // Create an exchange request
        const exchange = new Exchange({
            product1Id,
            product2Id,
            userId1: product1.ownerId, 
            userId2: product2.ownerId,
            exchangeStatus: 'pending',
            exchangeDate: new Date(),
        });

        await exchange.save();
        res.status(201).json(exchange);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



// 2. Accept or reject an exchange
exports.updateExchangeStatus = async (req, res) => {
  try {
    const { exchangeId, status } = req.body;
    const userId = req.userId; // Ensure user is authenticated

    // Validate the provided status
    const validStatuses = ['accepted', 'rejected', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Find the exchange request
    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    // Ensure only the involved users can update the exchange
    if (exchange.userId1.toString() !== userId && exchange.userId2.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this exchange' });
    }

    // Prevent redundant status updates
    if (exchange.exchangeStatus === status) {
      return res.status(400).json({ message: `Exchange is already ${status}` });
    }

    // Update the exchange status
    exchange.exchangeStatus = status;
    await exchange.save();

    res.status(200).json({ message: `Exchange status updated to ${status}`, exchange });
  } catch (error) {
    console.error('Error updating exchange status:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// 3. Get the status of an exchange
exports.getExchangeStatus = async (req, res) => {
  try {
    const { exchangeId } = req.params;

    const exchange = await Exchange.findById(exchangeId);
    if (!exchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    res.status(200).json(exchange);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4. Get all exchanges for a user
exports.getExchangesByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Ensure userId is valid
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Get all exchanges where the user is involved
    const exchanges = await Exchange.find({
      $or: [{ userId1: userId }, { userId2: userId }],
    }).populate('product1Id product2Id');

    if (exchanges.length === 0) {
      return res.status(404).json({ message: 'No exchanges found for this user' });
    }

    res.status(200).json(exchanges);
  } catch (error) {
    console.error('Error fetching exchanges:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
