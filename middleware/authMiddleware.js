const jwt = require('jsonwebtoken');  // Assuming you're using JWT

// Authentication middleware to extract and verify the JWT token
const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  // Remove "Bearer " prefix from token (if it exists)
  const bearerToken = token.split(' ')[1]; 

  // Verify the token and extract userId
  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;  // Assuming the token contains userId
    next();  // Proceed to the next middleware/route handler
  });
};

module.exports = authenticateUser;
