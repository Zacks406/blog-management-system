
const { registerUser, loginUser } = require('../controller/authController.js')
const express = require('express');

const router = express.Router();

router.post("/", registerUser);
router.get("/", loginUser)

module.exports = router;