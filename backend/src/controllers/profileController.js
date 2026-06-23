const Profile = require("../models/Profile");

const createProfile = async (req, res) => {
  try {
    const { bio, skills, experience, portfolioLinks } = req.body;

    if (req.user.role !== "freelancer") {
      return res.status(403).json({
        success: false,
        message: "Only freelancers can create profiles",
      });
    }

    const existingProfile = await Profile.findOne({ user: req.user._id });

    if (existingProfile) {
      return res.status(409).json({
        success: false,
        message: "Profile already exists. Use update instead.",
      });
    }

    const profile = await Profile.create({
      user: req.user._id,
      bio: bio || "",
      skills: skills || [],
      experience: experience || "",
      portfolioLinks: portfolioLinks || [],
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
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
      message: "Failed to create profile. Please try again.",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      "name email role"
    );

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile. Please try again.",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { bio, skills, experience, portfolioLinks } = req.body;

    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    if (bio !== undefined) profile.bio = bio;
    if (skills !== undefined) profile.skills = skills;
    if (experience !== undefined) profile.experience = experience;
    if (portfolioLinks !== undefined) profile.portfolioLinks = portfolioLinks;

    await profile.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
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
      message: "Failed to update profile. Please try again.",
    });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await Profile.deleteOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete profile. Please try again.",
    });
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
};
