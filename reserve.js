const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const dns = require('node:dns').promises

dns.setServers(["1.1.1.1", "1.0.0.1"])
require('dotenv').config();

let posts = [];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('App is working Correctly');
});


app.get('/api/posts/', (req, res) => {
    res.json(posts);
});

app.post('/api/posts/', (req, res) => {

    const post = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content,
        author: req.body.author
    }

    posts.push(post);

    res.json({
        message: "Record Created Successfully",
        event: post
    })

});
//const PORT = 5000;
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected: ${conn.connection.host}`);

        app.listen(process.env.PORT, () => {
            console.log(`Server Running on: ${process.env.PORT}`);
        });
    } catch (err) {
        console.log("not connected", err.message);
    }

};

connectDB();





