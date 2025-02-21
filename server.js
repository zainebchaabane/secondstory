const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
require("dotenv").config(); // To load environment variables from a .env file
const User = require('./models/user'); 

const app = express(); // Initialize express first

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");
const userRoutes = require("./routes/user");
const exchangeRoutes = require("./routes/exchange");


// Routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/exchange", exchangeRoutes);
app.use("/payment", paymentRoutes);
app.use("/user", userRoutes);

// Database connection using environment variables
const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/getmydeal";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
  });

// Set port using environment variable or default to 5000
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});



app.use(session({
  secret: 'your-secret-key', // Replace with a strong secret
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport strategies
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
