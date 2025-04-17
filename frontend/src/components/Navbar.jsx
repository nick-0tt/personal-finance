import React from "react";
import { Link } from "react-router";
import styles from "./Navbar.module.css";
import logo from "../assets/images/stock.png";
import axios from "axios";


function Navbar() {
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
                    <li><Link to="/login" onClick={async () => {
                        await axios.post("http://localhost:5000/api/logout");
                        window.location.href = "/login";
                    }}>Logout</Link></li>
                    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;