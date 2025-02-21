const mongoose = require('mongoose');

const associationSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   description: { type: String, required: true }
}, { timestamps: true });

const Association = mongoose.model('Association', associationSchema);

module.exports = Association;
