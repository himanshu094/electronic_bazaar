const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // Import dotenv package

// Load environment variables from the .env file
dotenv.config();

const checkAdminAuth = (req, res, next) => {
  // Extract the token from the "Authorization" header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: No Bearer token provided" });
  }

  // Extract the token from the header
  const token = authHeader.split(" ")[1];

  // Verify the token using your secret key
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Check if the decoded user has admin privileges
    if (decoded && decoded.userId) {
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden: User is not authorized as admin" });
    }
  });
};

module.exports = checkAdminAuth;
