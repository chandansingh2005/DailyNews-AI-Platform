const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
uploadImage,
} = require("../controllers/upload.controller");

const storage = multer.memoryStorage();

const upload = multer({
storage,
});

router.post(
"/",
upload.single("image"),
uploadImage
);

module.exports = router;
