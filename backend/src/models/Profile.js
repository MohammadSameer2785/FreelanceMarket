const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      maxlength: [1000, "Experience cannot exceed 1000 characters"],
      default: "",
    },
    portfolioLinks: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
