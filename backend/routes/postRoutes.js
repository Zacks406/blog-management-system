const express = require('express');
const {
    createPost,
    getAllPost,
    getSinglePost,
    deletPost,
    updatePost
} = require('../controller/postController.js');

const { protect } = require('../middleware/authMidleware.js');

const router = express.Router();

router.post("/create", protect, createPost);
router.get("/getall", getAllPost);
router.get("/:id", getSinglePost);
router.delete("/:id", protect, deletPost);
router.put("/:id", protect, updatePost);

module.exports = router;