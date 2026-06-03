const getHealth = (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Freelance Marketplace API is healthy",
    timestamp: new Date().toISOString(),
  });
};

module.exports = {
  getHealth,
};
