import { Navigate } from "react-router-dom";
import localStorageMethod from "../utils/localStorageMethod";

const ProtectedRoute = ({ element }) => {
    const accessToken = localStorageMethod.getAccessToken();
    if (accessToken) return element;
    return <Navigate to="/authorization" />;
};
export default ProtectedRoute;
