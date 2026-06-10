import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useContext } from 'react';
import AuthContex from '../contex/AuthContex';
import useAuth from '../hooks/useAuth';

function Login() {

    //const { token, login } = useContext(AuthContex)
    const { token, login } = useAuth()
    const navigate = useNavigate();

    // const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");

    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    })

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            // const res = await axios.post('http://localhost:5000/api/users/login',
            const res = await api.post("/users/login",
                /* {
                    email,
                    password
                } */

                formData
            );


            // console.log(res.data)
            //console.log(res.data.user.role)
            //console.log(res.data.user.email)


            /*   localStorage.setItem(
                  'token',
                  res.data.jwt
              ); */

            login(
                res.data.jwt,
                res.data.user
            )
            //console.log(res.data.jwt)
            //console.log(res.data.role)
            alert("Login successfull");
            navigate("/Dashboard")


        } catch (error) {
            console.log(error.message)
        };

    };

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h2>Login page</h2>

            <form onSubmit={handleLogin}>
                <input
                    name='email'
                    type='email'
                    placeholder='email'
                    value={formData.email}
                    //onChange={(e) => { setEmail(e.target.value) }}
                    onChange={handleChange}

                />
                <br></br>
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    //onChange={(e) => { setPassword(e.target.value) }}
                    value={formData.password}
                    onChange={handleChange}
                />
                <br></br>
                <button type='submit'>Login</button>
            </form>
        </div>
    );

};

export default Login;