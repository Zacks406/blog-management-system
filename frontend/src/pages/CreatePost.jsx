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
        <div className="min-h-screen bg-orange-100 flex justify-center items-center p-4 ">
            <form className="w-full max-w-md bg-gray-100 rounded shadow p-6 " onSubmit={handleSubmit}>
                <h3 className="text-2xl mb-6 text-center p-6">Create post</h3>
                <input className="w-full border p-2 rounded mb-6 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    //onChange={(e) => { setTitle(e.target.value) }}
                    onChange={handleChange}

                />
                <br></br>
                <textarea className="w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded shadow"
                    //type="textarea"
                    name="content"
                    value={formData.content}
                    placeholder="Content"
                    //onChange={(e) => { setContent(e.target.value) }}
                    onChange={handleChange}
                />
                <br></br>
                <button className="w-full bg-blue-400 rounded shadow text-white p-2 mt-2" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreatePost;