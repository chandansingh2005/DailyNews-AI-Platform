const User = require("../models/user.model");
const Article = require("../models/article.model");

// Create Article
const createCustomArticle = async (req, res) => {
try {
const user = await User.findById(req.user.id);


const article = await Article.create({
  title: req.body.title,
  description: req.body.description,
  content: req.body.content,
  image: req.body.image,
  userId: req.user.id,
  author: user.username,
});

res.status(201).json({
  success: true,
  data: article,
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: error.message,
});


}
};

// Get My Articles
const getMyArticles = async (req, res) => {
try {
const articles = await Article.find({
userId: req.user.id,
}).sort({ createdAt: -1 });


res.status(200).json({
  success: true,
  data: articles,
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: "Fetch failed",
});


}
};

// Update Article
const updateArticle = async (req, res) => {
try {
const article = await Article.findOneAndUpdate(
{
_id: req.params.id,
userId: req.user.id,
},
req.body,
{ new: true }
);


res.status(200).json({
  success: true,
  data: article,
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: "Update failed",
});


}
};

// Delete Article
const deleteArticle = async (req, res) => {
try {
await Article.findOneAndDelete({
_id: req.params.id,
userId: req.user.id,
});


res.status(200).json({
  success: true,
  message: "Article deleted",
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: "Delete failed",
});


}
};
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: articles,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch articles",
    });
  }
};

module.exports = {
createCustomArticle,
getMyArticles,
getAllArticles,
updateArticle,
deleteArticle,
};
