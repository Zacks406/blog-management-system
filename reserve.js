/* const getSinglePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ messase: error.message })
    }
}; */

/* const updatePost = async (req, res) => {
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
}; */

/* const deletPost = async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ Message: "Post Deleted Successfully", Post: deletePost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; */