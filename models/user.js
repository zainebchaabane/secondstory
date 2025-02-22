const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  address: { type: String },
  phone: { type: String },
  password: { type: String, required: true } // Add the password field explicitly
}, 
{ timestamps: true });



// Compare entered password with hashed password (You can remove this if using passport-local-mongoose for automatic handling)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Add Passport.js functionality to the schema
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

// Export the model
module.exports = mongoose.model('User', userSchema);
