import React from "react";
import {Link, useNavigate} from "react-router";
import axios from "axios";
import styles from "./LoginContainer.module.css";

function LoginContainer({isAuthenticated, setIsAuthenticated, setUser}) {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        console.log(username, password);
        try {
            const response = await axios.post("http://localhost:5000/api/login", {username, password});
            if (response.data) {
                setIsAuthenticated(true);
                setUser(response.data.user);
                navigate("/dashboard");
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginForm}>
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <input type="text" name="username" placeholder="Username" required autocomplete="off"/>
                    <input type="password" name="password" placeholder="Password" required autocomplete="off"/>
                    <button type="submit">Login</button>
                </form>
                <Link to="/register" className={styles.loginLink}>
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
}

export default LoginContainer;