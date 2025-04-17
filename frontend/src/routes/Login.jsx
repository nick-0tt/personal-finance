import React, { useEffect } from "react";
import {useNavigate} from "react-router";
import styles from "../App.module.css";
import LoginContainer from "../containers/LoginContainer";

function Login({authenticated, setUser, setAuthenticated}) {

    return (<>
        <div className={styles.App}>
            <LoginContainer isAuthenticated={authenticated} setUser={setUser} setIsAuthenticated={setAuthenticated}/>
        </div>
    </>);
}

export default Login;