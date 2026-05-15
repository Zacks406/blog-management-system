const express = require('express');
const {
    createPost,
    getAllPost,
    getSinglePost,
    deletPost,
    updatePost
} = require('../controller/postController.js')

const router = express.Router();

router.post("/", createPost);
router.get("/", getAllPost);
router.get("/:id", getSinglePost);
router.delete("/:id", deletPost);
router.put("/:id", updatePost);

module.exports = router