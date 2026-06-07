const axios = require("axios");

const getTopHeadlines = async (req, res) => {
  try {
    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&apikey=${process.env.NEWS_API_KEY}`
    );

    res.status(200).json({
      success: true,
      data: response.data.articles,
    });

  } catch (error) {

    console.log(error.response?.data);

    const dummyNews = [
      {
        title: "Artificial Intelligence is Transforming the World",
        description:
          "AI is rapidly changing industries including healthcare, education and software development.",
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        url: "https://example.com",
      },
      {
        title: "Technology Companies Continue AI Investment",
        description:
          "Major companies are investing billions into AI research and innovation.",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        url: "https://example.com",
      },
    ];

    res.status(200).json({
      success: true,
      data: dummyNews,
    });
  }
};

const searchNews = async (req, res) => {
  try {
    const { q } = req.query;

    const response = await axios.get(
      `https://gnews.io/api/v4/search?q=${q}&lang=en&apikey=${process.env.NEWS_API_KEY}`
    );

    res.status(200).json({
      success: true,
      data: response.data.articles,
    });

  } catch (error) {
    console.log(error.response?.data);

    res.status(500).json({
      success: false,
      message: "Search failed",
    });
  }
};

const getCategoryNews = async (req, res) => {
  try {
    const { category } = req.params;

    const response = await axios.get(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${process.env.NEWS_API_KEY}`
    );

    res.status(200).json({
      success: true,
      data: response.data.articles,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Category fetch failed",
    });
  }
};

module.exports = {
  getTopHeadlines,
  searchNews,
  getCategoryNews,
};