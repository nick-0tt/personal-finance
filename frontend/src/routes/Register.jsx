import React from "react";
import {useNavigate} from "react-router";
import styles from "../App.module.css";
import RegisterContainer from "../containers/RegisterContainer";

function Register({authenticated, setAuthenticated}) {
    const navigate = useNavigate();

    if (authenticated) {
        navigate("/dashboard");
    }

    return (<>
        <div className={styles.App}>
            <RegisterContainer authenticated={authenticated} setAuthenticated={setAuthenticated}/>
        </div>
    </>);
}

export default Register;