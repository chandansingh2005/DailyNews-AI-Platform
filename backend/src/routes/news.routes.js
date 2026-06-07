const express = require("express");
const router = express.Router();

const {
  getTopHeadlines,
  searchNews,
  getCategoryNews,
} = require("../controllers/news.controller");

const {
  createCustomArticle,
  getMyArticles,
  getAllArticles,
  updateArticle,
  deleteArticle,
} = require("../controllers/customNews.controller");

const {
  toggleLike,
  toggleBookmark,
} = require("../controllers/interaction.controller");

const authMiddleware = require("../middleware/auth.middleware");

// ================= PUBLIC ROUTES =================

router.get("/top-headlines", getTopHeadlines);
router.get("/search", searchNews);
router.get("/category/:category", getCategoryNews);

// ================= PROTECTED ROUTES =================

router.post("/custom", authMiddleware, createCustomArticle);

router.get(
  "/my-articles",
  authMiddleware,
  getMyArticles
);

router.put(
  "/custom/:id",
  authMiddleware,
  updateArticle
);

router.delete(
  "/custom/:id",
  authMiddleware,
  deleteArticle
);

router.put(
  "/like/:id",
  authMiddleware,
  toggleLike
);
router.get("/all-articles", getAllArticles);

router.put(
  "/bookmark/:id",
  authMiddleware,
  toggleBookmark
);

module.exports = router;