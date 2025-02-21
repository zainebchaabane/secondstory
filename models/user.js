const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  address: {type: String},
  phone: { type: String },
  },
 { timestamps: true });

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
// Add Passport.js functionality to the schema
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

// Export the model
module.exports = mongoose.model('User', userSchema);

