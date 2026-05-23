import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function CreatePost() {

    const token = localStorage.getItem('token');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/posts/create',
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

        if (res.data) {
            navigate('/Dashboard')
        }

    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="title"
                placeholder="Title"
                onChange={(e) => { setTitle(e.target.value) }}
            />
            <br></br>

            <input
                type="content"
                placeholder="Content"
                onChange={(e) => { setContent(e.target.value) }}
            />

            <br></br>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreatePost;