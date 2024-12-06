import React, { useState, useContext } from 'react';
import axios from "axios";
import { store } from '../App';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [token, setToken] = useContext(store);  // Using Context to manage token state
    
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(""); // Added error state to store error messages

    // Handler to update the form data
    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Submit handler for the login form
    const submitHandler = (e) => {
        e.preventDefault();

        // Basic input validation before sending request
        if (!data.email || !data.password) {
            setError("Both email and password are required.");  // Set error if any field is empty
            return;
        }

        // Reset error message before making the request
        setError("");

        // Send login request to backend
        axios.post("http://localhost:5000/login", data)
            .then(res => {
                setToken(res.data.token);  // Store JWT token in Context
            })
            .catch(err => {
                // Handle backend errors and display them to the user
                if (err.response) {
                    setError(err.response.data.error || "User Not Found. Please try again.");
                } else {
                    setError("An error occurred. Please try again."); // Generic error if no response
                }
            });
    };

    // If token exists, redirect the user to the 'myprofile' page
    if (token) {
        return <Navigate to="/myprofile" />;
    }

    return (
        <div>
            <center>
                <form onSubmit={submitHandler}>
                    <h3>Login</h3>
                    <input
                        type="email"
                        onChange={changeHandler}
                        name="email"
                        placeholder="Email"
                        value={data.email}  // Bind the input field to data state
                    /><br />
                    <input
                        type="password"
                        onChange={changeHandler}
                        name="password"
                        placeholder="Password"
                        value={data.password}  // Bind the input field to data state
                    /><br />
                    <input type="submit" value="Login" />
                    
                    {/* Display error message below the form */}
                    {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
                </form>
            </center>
        </div>
    );
};

export default Login;
