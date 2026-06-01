import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useContext } from 'react';
import AuthContex from '../contex/AuthContex';

function Login() {

    const { login } = useContext(AuthContex)

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();


        try {
            // const res = await axios.post('http://localhost:5000/api/users/login',
            const res = await api.post("/users/login",
                {
                    email,
                    password
                }
            );


            //console.log(res.data)

            /*   localStorage.setItem(
                  'token',
                  res.data.jwt
              ); */

            login(res.data.jwt)

            alert("Login successfull");
            navigate("/Dashboard")


        } catch (error) {
            console.log(error.message)
        };

    };

    return (
        <div>
            <h2>Login page</h2>

            <form onSubmit={handleLogin}>
                <input
                    type='email'
                    placeholder='email'
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <br></br>
                <input
                    type='password'
                    placeholder='password'
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <br></br>
                <button type='submit'>Login</button>
            </form>
        </div>
    );

};

export default Login;