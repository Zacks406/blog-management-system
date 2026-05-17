const express = require('express');
const {
    createPost,
    getAllPost,
    getSinglePost,
    deletPost,
    updatePost
} = require('../controller/postController.js');

const { protect } = require('../midleware/authMidleware.js');

const router = express.Router();

router.post("/create", protect, createPost);
router.get("/getall", getAllPost);
router.get("/getsingle:id", getSinglePost);
router.delete("/delete:id", deletPost);
router.put("/update:id", updatePost);

module.exports = router