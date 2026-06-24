import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./FreelancerProfile.css";

const FreelancerProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState("");

  const [formData, setFormData] = useState({
    bio: "",
    skills: [],
    experience: "",
    portfolioLinks: [],
  });

  const [portfolioInput, setPortfolioInput] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "freelancer") {
      navigate("/login");
      return;
    }

    setFetchLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProfile(response.data.data);
        setFormData({
          bio: response.data.data.bio || "",
          skills: response.data.data.skills || [],
          experience: response.data.data.experience || "",
          portfolioLinks: response.data.data.portfolioLinks || [],
        });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setIsEditing(true);
      } else {
        console.error("Failed to fetch profile:", error);
      }
    } finally {
      setFetchLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio cannot exceed 500 characters";
    }

    if (formData.experience && formData.experience.length > 1000) {
      newErrors.experience = "Experience cannot exceed 1000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleAddPortfolioLink = () => {
    if (portfolioInput.trim() && !formData.portfolioLinks.includes(portfolioInput.trim())) {
      setFormData({
        ...formData,
        portfolioLinks: [...formData.portfolioLinks, portfolioInput.trim()],
      });
      setPortfolioInput("");
    }
  };

  const handleRemovePortfolioLink = (linkToRemove) => {
    setFormData({
      ...formData,
      portfolioLinks: formData.portfolioLinks.filter((link) => link !== linkToRemove),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const url = "http://localhost:5000/api/profile";
      const method = profile ? "put" : "post";

      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setProfile(response.data.data);
        setIsEditing(false);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setErrors({ general: error.response.data.message });
      } else {
        setErrors({ general: "Failed to save profile. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        bio: profile.bio || "",
        skills: profile.skills || [],
        experience: profile.experience || "",
        portfolioLinks: profile.portfolioLinks || [],
      });
      setIsEditing(false);
    } else {
      navigate("/login");
    }
  };

  if (fetchLoading) {
    return <div className="loading-container">Loading profile...</div>;
  }

  if (!isEditing && profile) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h2>Freelancer Profile</h2>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          </div>

          <div className="profile-section">
            <h3>Bio</h3>
            <p>{profile.bio || "No bio added yet"}</p>
          </div>

          <div className="profile-section">
            <h3>Skills</h3>
            <div className="skills-display">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="no-data">No skills added yet</p>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Experience</h3>
            <p>{profile.experience || "No experience added yet"}</p>
          </div>

          <div className="profile-section">
            <h3>Portfolio Links</h3>
            <div className="portfolio-display">
              {profile.portfolioLinks.length > 0 ? (
                profile.portfolioLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-link"
                  >
                    {link}
                  </a>
                ))
              ) : (
                <p className="no-data">No portfolio links added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{profile ? "Edit Profile" : "Create Profile"}</h2>
        {errors.general && <div className="error-message">{errors.general}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className={errors.bio ? "error" : ""}
              placeholder="Tell clients about yourself..."
              rows="4"
              maxLength="500"
            />
            <span className="char-count">{formData.bio.length}/500</span>
            {errors.bio && <span className="error-text">{errors.bio}</span>}
          </div>

          <div className="form-group">
            <label>Skills</label>
            <div className="skill-input-group">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              />
              <button type="button" className="add-button" onClick={handleAddSkill}>
                Add
              </button>
            </div>
            <div className="skills-list">
              {formData.skills.map((skill, index) => (
                <span key={index} className="skill-tag-editable">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill(skill)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="experience">Experience</label>
            <textarea
              id="experience"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className={errors.experience ? "error" : ""}
              placeholder="Describe your work experience..."
              rows="4"
              maxLength="1000"
            />
            <span className="char-count">{formData.experience.length}/1000</span>
            {errors.experience && <span className="error-text">{errors.experience}</span>}
          </div>

          <div className="form-group">
            <label>Portfolio Links</label>
            <div className="portfolio-input-group">
              <input
                type="url"
                value={portfolioInput}
                onChange={(e) => setPortfolioInput(e.target.value)}
                placeholder="Add portfolio URL"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddPortfolioLink())}
              />
              <button type="button" className="add-button" onClick={handleAddPortfolioLink}>
                Add
              </button>
            </div>
            <div className="portfolio-list">
              {formData.portfolioLinks.map((link, index) => (
                <div key={index} className="portfolio-item">
                  <span>{link}</span>
                  <button type="button" onClick={() => handleRemovePortfolioLink(link)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Saving..." : profile ? "Update Profile" : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreelancerProfile;
