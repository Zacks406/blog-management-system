import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useContext } from 'react';
import AuthContex from '../contex/AuthContex';
import useAuth from '../hooks/useAuth';
import api from '../api/axios'
import Button from '../components/Button';

function Dashboard() {

    //const { logout } = useContext(AuthContex)
    //const { token, user } = useContext(AuthContex)
    const { token, user, logout } = useAuth();

    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchPosts = async () => {

            try {
                // const res = await axios.get('http://localhost:5000/api/posts/getall');
                const res = await api.get('posts/getall');
                setPosts(res.data)

            } catch (error) {
                console.log(error.message)
            }
        }
        fetchPosts();

    }, []);

    const handleDelete = async (id) => {

        // const token = localStorage.getItem("token");
        // const { token } = useContext(AuthContex)
        try {

            //  await axios.delete(`http://localhost:5000/api/posts/${id}`,
            await api.delete(`posts/${id}`,
                /* {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                } */
            );

            setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));

            alert("Post deleted successfully");

        } catch (error) {
            console.log({ Message: error.message })
        }
    }

    const handleLogout = () => {
        //localStorage.removeItem("token");
        logout()
        navigate("/Login")
    }


    return (
        <div className="min-h-screen bg-orange-100 p-6">
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-3xl font-bold mb-6'>Dashboard</h2>
                <p className='text-gray-600'>Welcome, {user?.email}</p>
               {/*  <button
                    className='bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700'
                    onClick={handleLogout}>
                    Logout
                </button> */}

                 <Button
                    onClick={handleLogout}
                    text="Logout"
                    variant="blue"
                /> 

            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {
                    posts.length == 0 ? (
                        <p className='text-gray-600'>Posts not found</p>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className='bg-white  p-4 rounded shadow hover:shadow-md transition'>
                                <h5 className='text-xl font-semibold mb-0 px-2'>{post.title}</h5>
                                <p className='text-gray-700 mb-2 px-2'>{post.content}</p>
                                <div className='flex gap-3'>
                                    {
                                        user?.role == "admin" &&
                                        (<Link className=' bg-blue-500 hover:bg-blue-600 my-2 mx-2 text-white rounded px-2' to={`/EditPost/${post._id}`}>Edit</Link>)
                                    }
                                    {
                                        user?.role == "admin" &&
                                       /*  (<button className=' bg-red-500 hover:bg-red-600  my-2 text-white rounded px-2' onClick={() => { handleDelete(post._id) }}>Delete</button>) */
                                         (
                                             <Button
                                                 text="Delete"
                                                 variant='red'
                                                 onClick={() => handleDelete(post._id)}
                                             />
                                         ) 
                                    }
                                </div>
                            </div>

                        ))
                    )
                }
            </div>

        </div>
    )
}

export default Dashboard