
const express = require('express');
const upload = require('../middleware/upload.js');
const { uploadImage } = require('../controller/uploadController.js')


const router = express.Router()

router.post("/", upload.single("profilePic"), uploadImage);

module.exports = router;