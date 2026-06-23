const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const healthRoutes = require("./routes/healthRoutes");
const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const roleRoutes = require("./routes/roleRoutes");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Freelance Marketplace API is running",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

startServer();
