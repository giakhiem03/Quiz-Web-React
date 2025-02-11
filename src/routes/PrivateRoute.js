import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }
    return <>{children}</>;
}

export default PrivateRoute;
