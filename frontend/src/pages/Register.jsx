import { useState } from "react";
import axios from 'axios';

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/users/register',
            {
                username,
                password,
                email
            }
        );
        console.log(res.data)
        //localStorage.setItem(res.data.jwt);

        alert("Register Successfull");

    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input
                    type="username"
                    placeholder="Username testing"
                    onChange={(e) => { setUsername(e.target.value) }}
                />
                <br></br>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <br></br>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <br></br>
                <button type="submit" style={{ color: "white", backgroundColor: "red", fontFamily: "sans-serif", border: "2px solid blue", borderRadius: "3px"  }}>Submit</button>
            </form>
        </div>
    );
};

export default Register