const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

// Add product to the cart
router.post('/add', cartController.addToCart);

// Delete a product from the cart
router.delete('/delete', cartController.deleteProductFromCart);

// Update product quantity in the cart
router.put('/update', cartController.updateProductQuantity);

// delete cart
router.delete('/:id', cartController.clearCart);
// get cart by id user 

router.get("/:userId", cartController.getCartByUserId);
router.get('/:id', cartController.getCartById);

module.exports = router;
