import { useState } from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/login',
                {
                    email,
                    password
                }
            );


            console.log(res.data)

            localStorage.setItem(
                'token',
                res.data.jwt);

            alert("Login successfull");


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