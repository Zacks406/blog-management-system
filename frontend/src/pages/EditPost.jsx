import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
    const navigate = useNavigate()
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const token = localStorage.getItem("token");
    const { id } = useParams();

    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setTitle(res.data.title);
                setContent(res.data.content);
            }
            fetchPost();
        } catch (error) {
            console.log({ Message: error.Message })
        }


    }, []);

    const handleUpdate = async () => {

        const res = await axios.put(`http://localhost:5000/api/posts/${id}`,

            {
                title,
                content
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        navigate("/Dashboard")
    }

    return (
        <form onSubmit={handleUpdate}>
            <input
                type="text"
                value={title}
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
            />
            <br></br>

            <input
                value={content}
                placeholder="content"
                onChange={(e) => setContent(e.target.value)}
            />

            <button type="submit">Update</button>
        </form>
    )
};

export default EditPost;