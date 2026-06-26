import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import useAuth from "../hooks/useAuth";

function Dashboard() {

    const { user, logout } = useAuth();
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // FETCH POSTS
    useEffect(() => {

        const fetchPosts = async () => {

            try {

                const res = await api.get("posts/getall");
                setPosts(res.data);

            } catch (error) {
                console.log(error.message);
            }

        };

        fetchPosts();

    }, []);

    // DELETE POST
    const handleDelete = async (id) => {

        try {

            await api.delete(`posts/${id}`);

            setPosts((prev) =>
                prev.filter((post) => post._id !== id)
            );

        } catch (error) {
            console.log(error.message);
        }

    };

    // LOGOUT
    const handleLogout = () => {

        logout();
        navigate("/Login");

    };

    return (

        <div className="min-h-screen bg-gray-100 p-6">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">

                <h2 className="text-3xl font-bold">
                    Dashboard
                </h2>

                <button
                    onClick={handleLogout}
                    className="
                        bg-gray-800
                        text-white
                        px-4
                        py-2
                        rounded
                        hover:bg-gray-700
                    "
                >
                    Logout
                </button>

            </div>

            {/* EMPTY STATE */}
            {posts.length === 0 ? (
                <p className="text-gray-600">
                    No posts found
                </p>
            ) : (

                <div className="grid gap-4">

                    {posts.map((post) => (

                        <div
                            key={post._id}
                            className="
                                bg-white
                                p-5
                                rounded
                                shadow
                                hover:shadow-md
                                transition
                            "
                        >

                            {/* TITLE */}
                            <h5 className="text-xl font-semibold mb-2">
                                {post.title}
                            </h5>

                            {/* CONTENT */}
                            <p className="text-gray-700 mb-4">
                                {post.content}
                            </p>

                            {/* ACTIONS */}
                            {user?.role === "admin" && (

                                <div className="flex gap-3">

                                    <Link
                                        to={`/EditPost/${post._id}`}
                                        className="
                                            bg-blue-500
                                            text-white
                                            px-3
                                            py-1
                                            rounded
                                            hover:bg-blue-600
                                        "
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            handleDelete(post._id)
                                        }
                                        className="
                                            bg-red-500
                                            text-white
                                            px-3
                                            py-1
                                            rounded
                                            hover:bg-red-600
                                        "
                                    >
                                        Delete
                                    </button>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default Dashboard;