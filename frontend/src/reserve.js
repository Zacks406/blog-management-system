import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      alert("Login successful");

    } catch (err) {

      console.log(err.response.data);

    }

  };

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App


import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  return (

    <BrowserRouter>

      <nav>

        <Link to="/login">
          Login
        </Link>

        {" | "}

        <Link to="/register">
          Register
        </Link>

        {" | "}

        <Link to="/dashboard">
          Dashboard
        </Link>

      </nav>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;




import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  // 🧠 DELETE FUNCTION
  const handleDelete = async (id) => {

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 🧠 update UI after delete
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== id)
      );

      alert("Post deleted successfully");

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>

      <h1>Dashboard</h1>

      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>

          <h3>{post.title}</h3>
          <p>{post.content}</p>

          <button onClick={() => handleDelete(post._id)}>
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default Dashboard;

setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))



import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  // 🧠 get ID from URL
  const { id } = useParams();

  // 🧠 fetch existing post
  useEffect(() => {

    const fetchPost = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );

        // 🧠 pre-fill form
        setTitle(res.data.title);
        setContent(res.data.content);

      } catch (error) {

        console.log(error.response?.data || error.message);

      }
    };

    fetchPost();

  }, [id]);

  // 🧠 update function
  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        {
          title,
          content
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Post updated successfully");

      navigate("/dashboard");

    } catch (error) {

      console.log(error.response?.data || error.message);

    }
  };

  return (
    <div>

      <h1>Edit Post</h1>

      <form onSubmit={handleUpdate}>

        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <button type="submit">
          Update Post
        </button>

      </form>

    </div>
  );
}

export default EditPost;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;



import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;


import { createContext, useState } from "react";

// 1. Create Context (empty container)
const AuthContext = createContext();

// 2. Provider component (shares data globally)
export function AuthProvider({ children }) {

  // 3. Create state for authentication
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  // 4. Function to login user
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // 5. Function to logout user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;


import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:5000/api/login",
      formData
    );

    // 🔥 IMPORTANT PART
    login(response.data.token);

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
      />

      <button type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;