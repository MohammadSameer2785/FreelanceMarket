const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const healthRoutes = require("./routes/healthRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", healthRoutes);

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
