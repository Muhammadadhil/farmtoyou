import { useUser } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const { user } = useUser();
    if (!user) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
} 