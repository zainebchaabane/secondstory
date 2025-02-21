const User = require('../models/user'); // Adjust path to your User model
const passport = require('passport');

// Handle user registration
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Ensure user doesn't already exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Create new user
        const newUser = new User({ username, email });
        await User.register(newUser, password); // Assuming you're using `passport-local-mongoose
        res.status(201).json({ message: 'Signup successful! You can now log in.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Handle user login
const jwt = require('jsonwebtoken');

// User login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Handle user logout
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out.' });
        }
        res.json({ message: 'Logged out successfully.' });
    });
};

// Check authentication status
exports.checkAuth = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ isAuthenticated: true, user: { id: req.user.id, username: req.user.username } });
    } else {
        res.json({ isAuthenticated: false });
    }
};
