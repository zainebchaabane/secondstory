const { Product, Clothes, Book } = require('../models/product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/products/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only .jpg, .jpeg, and .png formats are allowed!'), false);
};

const upload = multer({ storage, fileFilter });

// Get all products (including discriminators)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products', details: err.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching product', details: err.message });
    }
};

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, quantity, ...extraFields } = req.body;
        const ownerId = req.userId; // Get userId from authentication middleware

        if (!ownerId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        if (!name || !description || !price || !category || !quantity) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        let productData = { name, description, price, category, quantity, ownerId };

        if (req.file) {
            productData.image = req.file.path.replace(/\\/g, '/'); // Store image path
        }

        let product;
        if (category === 'Clothes') {
            product = await Clothes.create({ ...productData, ...extraFields });
        } else if (category === 'Book') {
            product = await Book.create({ ...productData, ...extraFields });
        } else {
            product = await Product.create(productData);
        }

        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        res.status(400).json({ error: 'Error creating product', details: err.message });
    }
};


// Update a product
exports.updateProduct = async (req, res) => {
    try {
        let productData = { ...req.body };

        if (req.file) {
            productData.image = req.file.path.replace(/\\/g, '/'); // Update image path
        }

        const product = await Product.findByIdAndUpdate(req.params.id, productData, {
            new: true,
            runValidators: true,
        });

        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(400).json({ error: 'Error updating product', details: err.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting product', details: err.message });
    }
};

exports.upload = upload;