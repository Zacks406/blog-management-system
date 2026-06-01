import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import api from "../api/axios";

function CreatePost() {

    const token = localStorage.getItem('token');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //  const res = await axios.post('http://localhost:5000/api/posts/create',
        const res = await api.post("/posts/create",
            {
                title,
                content
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log(res.data);
        alert("Post created successfully")

        navigate('/Dashboard')

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="title"
                placeholder="Title"
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <br></br>
            <textarea
                type="textarea"
                placeholder="Content"
                onChange={(e) => { setContent(e.target.value) }}
            />
            <br></br>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreatePost;