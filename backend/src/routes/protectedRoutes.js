const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/profile", auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Access granted to protected route",
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
});

module.exports = router;
