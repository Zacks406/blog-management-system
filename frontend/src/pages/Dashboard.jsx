import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        try {
            const fetchPosts = async () => {
                const res = await axios.get('http://localhost:5000/api/posts/getall');
                setPosts(res.data)
                // console.log(res.data)
            }
            fetchPosts()


        } catch (error) {
            console.log(error.message)
        }

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
                            <button onClick={() => { handleDelete(post._id) }}>Delete</button>
                        </div>

                    ))
                )
            }
        </div>
    )
}

export default Dashboard