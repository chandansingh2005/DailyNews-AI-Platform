const imagekit = require("../config/imagekit");

const uploadImage = async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({
success: false,
message: "No image selected",
});
}


const result = await imagekit.upload({
  file: req.file.buffer,
  fileName: `news-${Date.now()}.jpg`,
  folder: "/dailynews",
});

res.status(200).json({
  success: true,
  imageUrl: result.url,
});


} catch (error) {
console.log(error);


res.status(500).json({
  success: false,
  message: "Image upload failed",
});


}
};

module.exports = {
uploadImage,
};
