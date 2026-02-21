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
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }else{
    return res.status(401).json({message:"Not authorized, no token"});
  }

  
};

module.exports = { protect };
