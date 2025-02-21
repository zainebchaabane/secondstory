const Cart = require('../models/cart');
const Product = require('../models/product');

// Add product to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if one doesn't exist for the user
      cart = new Cart({ userId, products: [{ productId, quantity }] });
    } else {
      // Check if the product is already in the cart
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (productIndex !== -1) {
        // Update the quantity of the existing product
        cart.products[productIndex].quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product from the cart
exports.deleteProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove product from the cart
    cart.products = cart.products.filter(product => product.productId.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product quantity in the cart
exports.updateProductQuantity = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    // Update the quantity
    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear the cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Cart By user id 
exports.getCartByUserId = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  // Get Cart By id 


exports.getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};