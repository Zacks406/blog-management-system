import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import api from "../api/axios";

function CreatePost() {

    const token = localStorage.getItem('token');
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [formData, setFormData] = useState({
        "title": "",
        "content": ""
    })
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        //  const res = await axios.post('http://localhost:5000/api/posts/create',
        const res = await api.post("/posts/create",
            /*  {
                 title,
                 content
             }, */
            formData,
            /*  {
                 headers: {
                     'Authorization': `Bearer ${token}`
                 }
             } */
        );

        //console.log(res.data);
        alert("Post created successfully")

        navigate('/Dashboard')

    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                //onChange={(e) => { setTitle(e.target.value) }}
                onChange={handleChange}

            />
            <br></br>
            <textarea
                //type="textarea"
                name="content"
                value={formData.content}
                placeholder="Content"
                //onChange={(e) => { setContent(e.target.value) }}
                onChange={handleChange}
            />
            <br></br>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreatePost;