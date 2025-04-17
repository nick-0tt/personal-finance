import React from "react";
import styles from "./DashboardContainer.module.css";

function DashboardContainer({user}) {
    return (<>
        <div>
            <h1>{user && `Hello, ${user.username}.`}</h1>
        </div>
    </>);
}

export default DashboardContainer;