import axios from "axios";
import localStorageMethod from "./localStorageMethod";
import { logoutUser } from "../auth/auth";

//axios interceptors act as a middle man before every request and response.

//default config.
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_TOKEN_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

//Before making a request to the server every request will be modified here
axiosInstance.interceptors.request.use(async config => {
    const accessToken = localStorageMethod.getAccessToken();
    const refreshToken = localStorageMethod.getRefreshToken();

    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");
    let codeVerifier = localStorage.getItem("code_verifier");

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
    //We have the access token but it is expired then make a reqwuest for refrsh token
    if (config.url === "/api/token" && refreshToken) {
        config.data = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: import.meta.env.VITE_CLIENT_ID,
        });
        return config;
    }
    //if neither from above then that means we are logged in and making a request to the accessed spotify data
    config.baseURL = import.meta.env.VITE_SPOTIFY_BASE_URL;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

//Befor recieving every response below actions are perfomed.
axiosInstance.interceptors.response.use(
    response => {
        // if the response status is in 200s
        return response;
    },
    async error => {
        //if the response is above 200s level

        //if 401 then we are unauthariezed, and before redirecting the user to authorization page
        //check if the error is caused by refresh token expiration.
        if (error.response.status === 401) {
            const refreshToken = localStorageMethod.getRefreshToken();
            if (refreshToken) {
                try {
                    const response = await axiosInstance.post("/api/token");
                    console.log("i am from refresh token response", response);
                    localStorageMethod.setAccessToken(
                        response.data.access_token
                    );
                    localStorageMethod.setRefreshToken(
                        response.data.refresh_token
                    );
                    //If response has new access token make the previous request that threw error.
                    return axiosInstance(error.config);
                } catch (error) {
                    //if the status is error again the refresh token is expired or some other issue
                    logoutUser();
                }
            }
        }
        // if the error is not 401 but above logout the user
        if (error.response.status >= 500) {
            logoutUser();
        }
        // if the error is not 401 or at the server level, the error is from accessing spotify data
        //reject with error without logging out the user.
        return Promise.reject(error);
    }
);

export default axiosInstance;
