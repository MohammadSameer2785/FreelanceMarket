const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");

const router = express.Router();

router.post("/", auth, authorize("freelancer"), createProfile);
router.get("/", auth, authorize("freelancer"), getProfile);
router.put("/", auth, authorize("freelancer"), updateProfile);
router.delete("/", auth, authorize("freelancer"), deleteProfile);

module.exports = router;
