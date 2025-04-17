import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../App.module.css";
import DashboardContainer from "../containers/DashboardContainer";

function Dashboard({user}) {

    return (<>
        <Navbar/>
        <div className={styles.App}>
            <DashboardContainer user={user}/>
        </div>
        </>
    );
}

export default Dashboard;