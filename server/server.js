require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const learningPathRoutes = require("./routes/learningPathRoutes");
const progressRoutes = require("./routes/progressRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const aiRoutes = require("./routes/aiRoutes");
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

const app = express();

connectDB();

const allowedOrigins = [ process.env.CLIENT_URL, "http://localhost:5173",].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/learning-paths", learningPathRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use(
    "/api/resources",
    resourceRoutes
);

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Personalized Learning AI API is running",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});