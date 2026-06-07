const Bookmark = require("../models/bookmark.model");

const addBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: bookmark,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Bookmark failed",
    });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      data: bookmarks,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to load bookmarks",
    });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bookmark deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

module.exports = {
  addBookmark,
  getBookmarks,
  deleteBookmark,
};