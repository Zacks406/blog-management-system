import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';

function Dashboard() {

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchPosts = async () => {

            try {
                const res = await axios.get('http://localhost:5000/api/posts/getall');
                setPosts(res.data)

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchPosts();

    }, []);

    const handleDelete = async (id) => {

        const token = localStorage.getItem("token");
        try {

            await axios.delete(`http://localhost:5000/api/posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));

            alert("Post deleted successfully");

        } catch (error) {
            console.log({ Message: error.message })
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Login")
    }

    return (
        <div>
            <h2>Dashboard</h2>
            {
                posts.length == 0 ? (
                    <p>Posts not found</p>
                ) : (
                    posts.map((post) => (
                        <div key={post._id} style={{ border: '1px solid black', margin: '5px', padding: '5px' }}>
                            <h5>{post.title}</h5>
                            <p>{post.content}</p>
                            <Link to={`/EditPost/${post._id}`}>Edit</Link>
                            <button onClick={() => { handleDelete(post._id) }}>Delete</button>
                        </div>

                    ))
                )
            }
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard