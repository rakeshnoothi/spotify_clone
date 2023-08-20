import axios from "axios";
import localStorageMethod from "./localStorageMethod";
import { requestRefreshToken } from "../auth/auth";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_TOKEN_URL,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const accessToken = localStorageMethod.getAccessToken();
        const clientId = import.meta.env.VITE_CLIENT_ID;
        const redirectUri = import.meta.env.VITE_REDIRECT_URL;

        const urlParams = new URLSearchParams(window.location.search);
        let code = urlParams.get("code");
        let codeVerifier = localStorage.getItem("code_verifier");
        console.log(config);

        if (config.url === "/api/token") {
            config.data = new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                code_verifier: codeVerifier,
            });
        } else {
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
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            //request for new access token
            const response = await requestRefreshToken();
            //if there is a access token
            if (response.data.access_token) {
                //make the previous request which got error because of unauthorization
                const response = await axiosInstance
                    .request(error.config.url)
                    .then((res) => res);
                return response;
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
