import React from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Navbar.module.css";
import logo from "../assets/images/stock.png";
import axios from "axios";


function Navbar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/logout");
            console.log("Logged out successfully");
            navigate("/login", {replace: true});
        } catch (error) {
            console.error("Error logging out", error);
        }
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link to="/dashboard"><img className={styles.image} src={logo} alt="logo"/></Link>
            </div>
            <div className={styles.navlinks}>
                <ul>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/income">Income</Link></li>
                    <li><Link to="/expenses">Expenses</Link></li>
                    <li><Link to="/budgetting">Budgetting</Link></li>
                    <li>
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;