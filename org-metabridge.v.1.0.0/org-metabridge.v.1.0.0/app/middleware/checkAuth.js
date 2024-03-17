const jwt = require("jsonwebtoken");
const dotenv = require("dotenv"); // Import dotenv package

// Load environment variables from the .env file
dotenv.config();

// const checkAuth = (req, res, next) => {
//   // Extract the token from the request headers, assuming it's stored as an "Authorization" header
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized: No token provided' });
//   }

//   // Verify the token using your secret key
//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Unauthorized: Invalid token' });
//     }

//     // The token is valid, and you can access the decoded user information if needed
//     req.user = decoded;
//     next(); // Proceed to the next middleware or route handler
//   });
// };

const checkAuth = (req, res, next) => {
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

    // The token is valid, and you can access the decoded user information if needed
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = checkAuth;
