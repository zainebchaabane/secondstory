const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

// Checkout (Place Order)
router.post("/checkout", async (req, res) => {
  try {
    const { userId, products, totalPrice, shippingAddress, paymentMethod } = req.body;

    // Create a new order
    const order = new Order({
      userId,
      products,
      totalPrice,
      shippingAddress,
      paymentMethod,
      status: "pending",
    });

    // Save the order to the database
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders for a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific order by its ID
router.get("/order/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (e.g., change status to 'shipped' or 'delivered')
router.put("/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel an order (e.g., if the order is still in 'pending' status)
router.delete("/:orderId", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
