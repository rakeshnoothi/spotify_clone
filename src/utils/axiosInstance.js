import axios from "axios";
import localStorageMethod from "./localStorageMethod";
import { logoutUser } from "../auth/auth";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_BASE_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

axiosInstance.interceptors.request.use(async (config) => {
    const accessToken = localStorageMethod.getAccessToken();
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let codeVerifier = localStorage.getItem("code_verifier");

    if (config.url === "/api/token") {
        if (!accessToken) {
            config.data = new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier,
            });
        }
    } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(response);
        return response;
    },
    async (error) => {
        console.log(error);
        const refreshToken = localStorageMethod.getRefreshToken();
        if (error.response.status === 401 && refreshToken) {
            await axiosInstance.post("/api/token", {
                grant_type: "refresh_token",
                refresh_token: refreshToken,
                clientId: import.meta.env.VITE_CLIENT_ID,
            });
        }
        if (error.response.message === "The refresh token has expired.") {
            logoutUser();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
