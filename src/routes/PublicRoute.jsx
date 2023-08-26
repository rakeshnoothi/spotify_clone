import { Navigate } from "react-router-dom";
import localStorageMethod from "../utils/localStorageMethod";

const PublicRoute = ({ element }) => {
    const accessToken = localStorageMethod.getAccessToken();
    if (!accessToken) return element;
    return <Navigate to="/" replace={true} />;
};
export default PublicRoute;
