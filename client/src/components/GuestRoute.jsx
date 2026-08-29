import { Navigate, Outlet } from "react-router-dom";

function GuestRoute() {
    const userId = localStorage.getItem("userId");
    if (userId) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}

export default GuestRoute;