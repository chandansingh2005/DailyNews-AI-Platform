const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require("../controllers/auth.controller");

const {
    registerUserValidationRules
} = require("../middleware/validation.middleware");

// Register
router.post(
    "/register",
    registerUserValidationRules,
    registerUser
);

// Login
router.post(
    "/login",
    loginUser
);

// Logout
router.post(
    "/logout",
    logoutUser
);

module.exports = router;