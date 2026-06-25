const Job = require("../models/Job");

const createJob = async (req, res) => {
  try {
    const { title, description, budget, deadline } = req.body;

    if (req.user.role !== "client") {
      return res.status(403).json({
        success: false,
        message: "Only clients can create jobs",
      });
    }

    const job = await Job.create({
      title,
      description,
      budget,
      deadline,
      clientId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create job. Please try again.",
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const query = search
      ? { title: { $regex: search, $options: "i" }, status: "open" }
      : { status: "open" };

    const jobs = await Job.find(query)
      .populate("clientId", "name email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Job.countDocuments(query);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch jobs. Please try again.",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "clientId",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch job. Please try again.",
    });
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
};
