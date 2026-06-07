const express = require("express");

const router = express.Router();

const {
  summarizeText,
} = require("../controllers/ai.controller");

router.post(
  "/summarize",
  summarizeText
);

module.exports = router;