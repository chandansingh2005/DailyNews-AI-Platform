const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  addBookmark,
  getBookmarks,
  deleteBookmark,
} = require("../controllers/bookmark.controller");

// Add Bookmark
router.post(
  "/",
  authMiddleware,
  addBookmark
);

// Get All Bookmarks of Logged In User
router.get(
  "/",
  authMiddleware,
  getBookmarks
);

// Delete Bookmark
router.delete(
  "/:id",
  authMiddleware,
  deleteBookmark
);

module.exports = router;