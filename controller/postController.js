

const Post = require('../models/Post.js');

const createPost = async (req, res) => {
    try {

        const { title, content } = req.body;
        const post = new Post({
            title,
            content,
            author: req.user.id
        });

        const savePost = await post.save();
        res.status(200).json(savePost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPost = async (req, res) => {
    try {
        posts = await Post.find().populate("author", "username email");
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ Message: error.message })
    };
};



const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                Message: "Post not found"
            });
        };

        res.status(200).json({
            Post: post
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message
        });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                Message: "Post not found"
            });
        };

        if (post.author._id.toString() !== req.user.id) {
            return res.status(403).json({ Message: "User not authorize" });
        };
        console.log(post.author._id.toString());

        post.title = req.body.title || post.title,
            post.content = req.body.content || post.content

        const savePost = await post.save();

        res.status(200).json({
            Message: "Post updated successfully",
            Post: savePost
        });
    } catch (error) {
        res.status(500).json({
            Message: error.message
        });
    }
};

const deletPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ Message: "Post not found" });
            console.log(post);
        }

        if (post.author._id.toString() !== req.user.id) {
            return res.status(403).json({ Message: "User not authorize" });
        };

        const deleteP = await post.deleteOne();

        res.status(200).json({
            Message: "Post deleted successfully",
            Post: deleteP
        });

    } catch (error) {
        res.status(500).json({
            Message: error.message
        });
    }
};

module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    deletPost,
    updatePost

};

