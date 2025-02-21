const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, enum: ['Clothes', 'Book'], required: true },
  quantity: { type: Number, required: true },
  image: { type: String }, // This can be the file path or URL of the image.
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Added ownerId field
}, { timestamps: true, discriminatorKey: 'category' });

const Product = mongoose.model('Product', productSchema);

// ---------------- Discriminators ---------------- //

// **Clothes Schema**
const clothesSchema = new mongoose.Schema({
  color: { type: String },
  size: { type: String, enum: ['S', 'M', 'L', 'XL'] },
  subCategory: { type: String, enum: ['Dress', 'Skirt', 'Shirt', 'Pant'] }
});
const Clothes = Product.discriminator('Clothes', clothesSchema);

// **Book Schema**
const bookSchema = new mongoose.Schema({
  authorName: { type: String, required: true },
});
const Book = Product.discriminator('Book', bookSchema);

// Export all models
module.exports = { Product, Clothes, Book };
