import React from "react";
import {Link, useNavigate} from "react-router";
import axios from "axios";
import styles from "./RegisterContainer.module.css";

function RegisterContainer({authenticated, setAuthenticated}) {
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        if (!username || !password) {
            alert("Please fill in all fields");
            return;
        }

        console.log(username, password);
        try {
            const response = await axios.post("http://localhost:5000/api/register", {username, password});
            if (response.data) {
                setAuthenticated(true);
                navigate("/dashboard");
            } else {
                alert("Error registering user");
            }
        } catch (error) {
            console.error("Error logging in", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className={styles.registerContainer}>
            <div className={styles.registerForm}>
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
                    <input minLength="4" maxLength="16" type="text" name="username" placeholder="Username" required autoComplete="off"/>
                    <input minLength="7" type="password" name="password" placeholder="Password" required autoComplete="off"/>
                    <button type="submit">Register</button>
                </form>
                <Link to="/login" className={styles.registerLink}>
                    Have an account? Login here
                </Link>
            </div>
        </div>
    );
}

export default RegisterContainer;