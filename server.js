const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('node:dns').promises;
const Post = require('./models/Post.js');
const postRoutes = require('./routes/postRoutes.js');
const authRoutes = require('./routes/authRouts.js');

dns.setServers(["1.1.1.1", "1.0.0.1"]);

const app = express();
app.use(express.json());
dotenv.config();

app.use("/api/posts", postRoutes);
app.use("/api/users", authRoutes);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected Successfully to: ${conn.connection.host}`);

        app.listen(process.env.PORT, () => {
            console.log(`Server Running on Port: ${process.env.PORT}`);
        });
    } catch (err) {
        console.log(`Not Connected: ${err.message}`)
    }
};

connectDB();