const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    return res.status(400).json({ message: "Token is invalid" });
  }
};

module.exports = verifyToken;