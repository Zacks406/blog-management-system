
const { registerUser, loginUser, getUsers } = require('../controller/authController.js')
const express = require('express');

const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser)
router.get("/", getUsers);

module.exports = router;