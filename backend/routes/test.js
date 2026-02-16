const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

// Protected route
router.get("/protected", protect, (req, res) => {
  res.json({
    message: "This route is protected",
    user: req.user
  });
});

module.exports = router;
