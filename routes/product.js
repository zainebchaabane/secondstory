const express = require('express');
const productController = require('../controllers/product.controller'); // Import the controller
const router = express.Router();
const authenticateUser = require('../middleware/authMiddleware');  // Import the middleware

// Get all products
router.get('/books', productController.getAllProducts);

 
// Get a single product by ID
router.get('/:id', productController.getProductById);

// Create a new product with image upload
router.post(
    '/',authenticateUser,
    productController.upload.single('image'), // Middleware to handle single image upload
    productController.createProduct
);


// Update a product with image upload
router.put(
    '/:id',
    productController.upload.single('image'), // Middleware to handle single image upload
    productController.updateProduct
);

// Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;