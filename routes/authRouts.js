
const { registerUser, loginUser, getUsers } = require('../controller/authController.js')
const { protect } = require('../midleware/authMidleware.js');
const express = require('express');

const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser)
router.get("/", getUsers);
router.get("/dashboard", protect, (req, res) => {
    res.json({ Message: "Login Sucessfull" })
});

module.exports = router;