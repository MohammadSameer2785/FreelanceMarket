const express = require("express");
const auth = require("../middleware/auth");
const authorize = require("../middleware/authorize");
const { createJob, getAllJobs, getJobById } = require("../controllers/jobController");

const router = express.Router();

router.post("/", auth, authorize("client"), createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);

module.exports = router;
