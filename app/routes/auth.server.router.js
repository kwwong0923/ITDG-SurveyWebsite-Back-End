const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.server.controller");

router.post("/login", authController.loginUser);

router.post("/signup", authController.signupUser);

router.post("/logout", authController.logoutUser);

module.exports = router;