
const { registerUser } = require('../controller/authController.js')
const express = require('express');

const router = express.Router();

router.post("/", registerUser);

module.exports = router;