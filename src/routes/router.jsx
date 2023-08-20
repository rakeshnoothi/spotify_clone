import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import App from "../App";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

//pages import.
import Authorization from "../pages/Authorization";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import { requestAccessToken } from "../auth/auth";
import localStorageMethod from "../utils/localStorageMethod";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<App />} path="/">
            <Route
                element={<PublicRoute element={<Authorization />} />}
                path="/authorization"
            />
            <Route
                element={<ProtectedRoute element={<Home />} />}
                path="/"
                loader={async () => {
                    const accessToken = localStorageMethod.getAccessToken();
                    if (!accessToken) {
                        await requestAccessToken();
                    }
                    return null;
                }}
            />
            <Route
                element={<ProtectedRoute element={<Profile />} />}
                path="/profile"
            />
        </Route>
    )
);

export default router;
