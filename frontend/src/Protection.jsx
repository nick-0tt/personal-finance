import React from "react";

function ProtectedRoute({ isAuthenticated, children }) {

    if (!isAuthenticated) {
        return (
            <div>
                <h1>Unauthorized Access</h1>
                <p>You are not authorized to view this page.</p>
            </div>
        );
    }

    // Render the protected route if authenticated
    return children;
}

export default ProtectedRoute;