import { Navigate, useLocation } from "react-router-dom";


function ProtectedRoute({ children, permission }) {


    const token = localStorage.getItem("token");


    const user = JSON.parse(
        localStorage.getItem("user")
    ) || {};


    const location = useLocation();



    // No Login
    if (!token) {

        return <Navigate to="/" />;

    }



    // Admin has full access
    if (user.role === "Admin") {

        return children;

    }



    // Teacher permission check
    if (permission && !user.permissions?.[permission]) {

        return (
            <Navigate 
                to="/dashboard"
                state={{from: location}}
            />
        );

    }



    return children;


}



export default ProtectedRoute;