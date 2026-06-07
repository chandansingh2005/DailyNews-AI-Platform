const Article = require("../models/article.model");

const toggleLike = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    const userId = req.user.id;

    const alreadyLiked = article.likes.includes(userId);

    if (alreadyLiked) {
      article.likes = article.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      article.likes.push(userId);
    }

    await article.save();

    res.status(200).json({
      success: true,
      likes: article.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleBookmark = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    const userId = req.user.id;

    const bookmarked = article.bookmarks.includes(userId);

    if (bookmarked) {
      article.bookmarks = article.bookmarks.filter(
        (id) => id.toString() !== userId
      );
    } else {
      article.bookmarks.push(userId);
    }

    await article.save();

    res.status(200).json({
      success: true,
      bookmarks: article.bookmarks.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  toggleLike,
  toggleBookmark,
};