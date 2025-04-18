import React, { useEffect } from "react";
import {useNavigate} from "react-router";
import styles from "../App.module.css";
import LoginContainer from "../containers/LoginContainer";

function Login({fetch, setUser, setAuthenticated}) {

    return (<>
        <div>
            <LoginContainer fetch={fetch} setUser={setUser} setIsAuthenticated={setAuthenticated}/>
        </div>
    </>);
}

export default Login;