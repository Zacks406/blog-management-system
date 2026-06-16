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

// ===============================
// IMPORTS
// ===============================
const Post = require("../models/postModel");
const sanitizeHtml = require("sanitize-html");



// ===============================
// CREATE POST CONTROLLER
// ===============================
const createPost = async (req, res, next) => {
    try {

        // =========================================
        // 1. AUTHENTICATION CHECK
        // =========================================
        // Make sure user exists from auth middleware
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }



        // =========================================
        // 2. EXTRACT DATA
        // =========================================
        let { title, content } = req.body;



        // =========================================
        // 3. VALIDATION
        // =========================================
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        // Remove unnecessary spaces
        title = title.trim();
        content = content.trim();

        // Length validation
        if (title.length < 3 || title.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Title must be between 3 and 100 characters"
            });
        }

        if (content.length < 10) {
            return res.status(400).json({
                success: false,
                message: "Content is too short"
            });
        }



        // =========================================
        // 4. SANITIZE INPUT
        // =========================================
        title = sanitizeHtml(title);
        content = sanitizeHtml(content);



        // =========================================
        // 5. BUSINESS RULE CHECK
        // =========================================
        // Example:
        // prevent duplicate title by same user

        const existingPost = await Post.findOne({
            title,
            author: req.user.id
        });

        if (existingPost) {
            return res.status(409).json({
                success: false,
                message: "You already created a post with this title"
            });
        }



        // =========================================
        // 6. CREATE POST OBJECT
        // =========================================
        const newPost = new Post({
            title,
            content,
            author: req.user.id
        });



        // =========================================
        // 7. SAVE TO DATABASE
        // =========================================
        const savedPost = await newPost.save();



        // =========================================
        // 8. POPULATE AUTHOR DATA (OPTIONAL)
        // =========================================
        const populatedPost = await Post.findById(savedPost._id)
            .populate("author", "name email");



        // =========================================
        // 9. SUCCESS RESPONSE
        // =========================================
        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: populatedPost
        });



    } catch (error) {

        // =========================================
        // 10. ERROR HANDLING
        // =========================================
        next(error);

    }
};



// ===============================
// EXPORT
// ===============================
module.exports = {
    createPost
};

import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const res = await axios.get("http://localhost:5000/api/posts");

                setPosts(res.data);

            } catch (error) {

                console.log("Error fetching posts:", error);

            }

        };

        fetchPosts();

    }, []);

    return (
        <div>

            <h1>Dashboard</h1>

            {posts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                posts.map((post) => (
                    <div key={post._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>

                        <h3>{post.title}</h3>

                        <p>{post.content}</p>

                        <small>
                            Author: {post.author?.username || "Unknown"}
                        </small>

                    </div>
                ))
            )}

        </div>
    );
}

export default Dashboard;



const storage = multer.diskStorage(
    {
        destination: (req, file, cd) => {
            cd(null,
                "/upload"
            )
        }
    },

    {
        fileName: (req, file, cd) => {
            cd(
                null,
                Date.now() + "_" + file.originalname
            )
        }
    }
)

function uplodPhoto() {

    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setImage(e.target.file[0]);
    }

    const handleUpload = () => {

        const formData = new FormData();
        formData.append("profilePic", image);

        if (!image) {
            alert("Selet an image")
            return
        }

        try {
            const res = await api.post("/upload",
                formData
            )

            console.log(res.data.message)
        } catch (error) {
            console.log("Fail to upload")
        }
    }

    return (
        <div>
            <h1>Upload your profile picture</h1>

            <div>

                <input
                    type="file"
                    onChange={handleChange}
                />

                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>
    )
}