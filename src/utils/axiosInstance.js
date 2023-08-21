import axios from "axios";
import localStorageMethod from "./localStorageMethod";
import { logoutUser, requestRefreshToken } from "../auth/auth";
import isTokenExpired from "./tokenValid";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_TOKEN_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorageMethod.getAccessToken();
        const expiryTime = localStorageMethod.getExpireTime();
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
        } else {
            const isExpired = isTokenExpired(
                localStorage.getItem("token_recieved_date"),
                expiryTime
            );
            if (isExpired) {
                console.log("i am from refresh");
                const refreshConfig = requestRefreshToken(config);
                return refreshConfig;
            }
            console.log("i ran from resoursce ");
            config.baseURL = import.meta.env.VITE_SPOTIFY_BASE_URL;
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        console.log(error);
        if (!error.response) {
            console.log("cannot make a request");
        }
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.config.url === "/api/token") {
            localStorageMethod.setAccessToken(response.data.access_token);
            localStorageMethod.setRefreshToken(response.data.refresh_token);
            localStorageMethod.setExpireTime(response.data.expires_in);
            const tokenReceivedDate = new Date();
            localStorage.setItem("token_recieved_date", tokenReceivedDate);
        }
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            logoutUser();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
