import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useContext } from 'react';
import AuthContex from '../contex/AuthContex';
import useAuth from '../hooks/useAuth';
import { useReducer } from 'react';

function Login() {

    //const { token, login } = useContext(AuthContex)
    const { token, login } = useAuth()
    const navigate = useNavigate();
    const [error, setError] = useState("")
    // const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");

    /*  const [formData, setFormData] = useState({
         "email": "",
         "password": ""
     }) */

    const initialState = {
        email: "",
        password: ""
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("")

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!state.email || !state.password) {
            //alert("All fields are required")
            setError("All fields are required")
            return;
        }

        if (!emailRegex.test(state.email)) {
            setError("Email does not match")
            return;
        }

        if (state.password.length < 4) {
            setError("Password must be at least 4 characters")
            return;
        }

        try {
            // const res = await axios.post('http://localhost:5000/api/users/login',
            const res = await api.post("/users/login",
                /* {
                    email,
                    password
                } */

                //formData
                state
            );


            // console.log(res.data)
            //console.log(res.data.user.role)
            //console.log(res.data.user.email)
            console.log(state.email)


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
            setError("Login failed")
        };

    };

    const handleChange = (e) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function reducer(state, action) {

        switch (action.type) {
            case "setEmail":
                return {
                    ...state,
                    email: action.payload
                }

            case "setPassword":
                return {
                    ...state,
                    password: action.payload
                }
            default: return state

        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    return (



        <div>
            <h2 className = "text-3xl font-bold underline">Login page</h2>

            {
                error && <p style={{ color: "red"}}>{error}</p>
            }
            <form onSubmit={handleLogin}>
                <input
                    name='email'
                    type='email'
                    placeholder='email'
                    // value={formData.email}
                    value={state.email}
                    //onChange={(e) => { setEmail(e.target.value) }}
                    //onChange={handleChange}
                    onChange={(e) => {
                        dispatch({
                            type: "setEmail",
                            payload: e.target.value
                        })
                    }}

                />
                <br></br>
                <input
                    name='password'
                    type='password'
                    placeholder='password'
                    //onChange={(e) => { setPassword(e.target.value) }}
                    //value={formData.password}
                    value={state.password}
                    //onChange={handleChange}
                    onChange={(e) => {
                        dispatch({
                            type: "setPassword",
                            payload: e.target.value
                        })
                    }}
                />
                <br></br>
                <button type='submit' >Login</button>
            </form>
        </div>
    );

};

export default Login;


//disabled={!state.email || !state.password}

//const passwordRegex =
//  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;