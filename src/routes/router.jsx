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
import Home from "../pages/home/Home";
import Search from "../pages/search/search";
import Library from "../pages/library/Library";
import localStorageMethod from "../utils/localStorageMethod";
import axiosInstance from "../utils/axiosInstance";
import Main from "../pages/main/Main";

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
                        try {
                            const response = await axiosInstance.post(
                                "/api/token"
                            );
                            localStorageMethod.setAccessToken(
                                response.data.access_token
                            );
                            localStorageMethod.setRefreshToken(
                                response.data.refresh_token
                            );
                        } catch (error) {
                            console.log("error from router", error);
                        }
                    }
                    return null;
                }}
            />
            <Route
                element={<ProtectedRoute element={<Search />} />}
                path="/search"
            />
            <Route
                element={<ProtectedRoute element={<Library />} />}
                path="/library"
            />
            <Route
                element={<ProtectedRoute element={<Main />} />}
                path="/:categoryTYpe/:itemId"
            />
        </Route>
    )
);

export default router;
