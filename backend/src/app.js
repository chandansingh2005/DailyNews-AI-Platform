const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const newsRoutes = require("./routes/news.routes");
const userRoutes = require("./routes/user.routes");
const bookmarkRoutes = require("./routes/bookmark.routes");
const aiRoutes = require("./routes/ai.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://daily-news-ai-platform.vercel.app",
      "https://daily-news-ai-platform-oa0eu3a4y-chandansingh2005s-projects.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "DailyNews AI Backend Running",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/upload", uploadRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

module.exports = app;