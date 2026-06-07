const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Text is required",
      });
    }

    const words = text.split(" ");

    const summary =
      words.slice(0, 150).join(" ") +
      (words.length > 150 ? "..." : "");

    res.status(200).json({
      success: true,
      summary,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  summarizeText,
};