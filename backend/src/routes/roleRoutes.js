const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");

const router = express.Router();

// Client-only route
router.get("/client-dashboard", auth, authorize("client"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Client Dashboard",
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

// Freelancer-only route
router.get("/freelancer-dashboard", auth, authorize("freelancer"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Freelancer Dashboard",
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

// Admin-only route
router.get("/admin-dashboard", auth, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Dashboard",
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

// Route accessible by both client and freelancer
router.get("/shared-dashboard", auth, authorize("client", "freelancer"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Shared Dashboard",
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
