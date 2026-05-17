

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
}

const getAllPost = async (req, res) => {
    try {
        posts = await Post.find().populate("author", "username email");
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ Message: error.message })
    }
};

const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ messase: error.message })
    }
};

const updatePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content,
                author: req.body.author
            },
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletPost = async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ Message: "Post Deleted Successfully", Post: deletePost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    deletPost,
    updatePost

};

