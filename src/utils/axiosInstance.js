import axios from "axios";
import localStorageMethod from "./localStorageMethod";
import { logoutUser } from "../auth/auth";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_TOKEN_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

axiosInstance.interceptors.request.use(async config => {
    const accessToken = localStorageMethod.getAccessToken();
    const refreshToken = localStorageMethod.getRefreshToken();

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let codeVerifier = localStorage.getItem("code_verifier");

    console.log(config);

    if (config.url === "/api/token" && !accessToken) {
        config.data = new URLSearchParams({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUri,
            client_id: clientId,
            code_verifier: codeVerifier,
        });
        return config;
    }
    if (config.url === "/api/token" && refreshToken) {
        config.data = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: import.meta.env.VITE_CLIENT_ID,
        });
        return config;
    }
    console.log("i ran from resoursce ");
    config.baseURL = import.meta.env.VITE_SPOTIFY_BASE_URL;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

axiosInstance.interceptors.response.use(
    response => {
        console.log("iam from interceptor ok response", response);
        return response;
    },
    async error => {
        console.log("error from interceptore", error);
        if (error.response.status === 401) {
            const refreshToken = localStorageMethod.getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await axiosInstance.post("/api/token");
                    localStorageMethod.setAccessToken(
                        response.data.access_token
                    );
                    return axiosInstance(error.config);
                } catch (error) {
                    console.log("error from refresh token update", error);
                    logoutUser();
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
