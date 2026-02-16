const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // 1️⃣ Authorization header check
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2️⃣ Token extract
      token = req.headers.authorization.split(" ")[1];

      // 3️⃣ Token verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4️⃣ User find
      req.user = await User.findById(decoded.id).select("-password");

      // 5️⃣ Call next() → next middleware / controller
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // 6️⃣ Agar token hi nahi mila
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
