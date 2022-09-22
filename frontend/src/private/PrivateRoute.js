import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const CPrivateRoute = ({ redirectPath = '/login', children }) => {
    const state = useSelector(state => state.auth);
    if (state.isAuthenticated && state.user.is_chairman
        && state.user.email_validation) {
        return children;
    }
    return <Navigate to={redirectPath} replace />;
}

export const SPrivateRoute = ({ redirectPath = '/login', children }) => {
    const state = useSelector(state => state.auth);
    if (state.isAuthenticated && state.user.is_student
        && state.user.email_validation) {
        return children;
    }
    return <Navigate to={redirectPath} replace />;
}