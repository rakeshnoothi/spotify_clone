import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import localStorageMethod from "../utils/localStorageMethod";

function generateRandomString(length) {
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);

    return base64encode(digest);
}

export async function requestAuthorization() {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_REDIRECT_URL;

    let codeVerifier = generateRandomString(128);

    const codeChallenge = await generateCodeChallenge(codeVerifier);

    let state = generateRandomString(16);
    let scope = "user-read-private user-read-email";

    localStorage.setItem("code_verifier", codeVerifier);

    let args = new URLSearchParams({
        response_type: "code",
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
    });

    window.location = "https://accounts.spotify.com/authorize?" + args;
}

export async function requestAccessToken() {
    try {
        const response = await axiosInstance.post("/api/token");
        localStorageMethod.setAccessToken(response.data.access_token);
        localStorageMethod.setRefreshToken(response.data.refresh_token);
        localStorageMethod.setExpireTime(response.data.expires_in);
    } catch (error) {
        console.log(error);
        if (
            error.response.data.error_description ===
            "Invalid authorization code"
        ) {
            console.log("user denied authorization");
        }
    }
}

export async function requestRefreshToken() {
    const refreshToken = localStorageMethod.getRefreshToken();
    let body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: import.meta.env.VITE_CLIENT_ID,
    });
    if (refreshToken) {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SPOTIFY_TOKEN_URL}/api/token`,
                body,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            localStorageMethod.setAccessToken(response.data.access_token);
            localStorageMethod.setRefreshToken(response.data.refresh_token);
            localStorageMethod.setExpireTime(response.data.expires_in);
            return response;
        } catch (error) {
            console.log(error);
            logoutUser();
        }
    } else {
        logoutUser();
    }
}

export function logoutUser() {
    localStorage.clear();
    document.location.reload();
}
// export const requestAccessToken = async () => {
//     const clientId = import.meta.env.VITE_CLIENT_ID;
//     const redirectUri = import.meta.env.VITE_REDIRECT_URL;

//     const urlParams = new URLSearchParams(window.location.search);
//     let code = urlParams.get("code");
//     let codeVerifier = localStorage.getItem("code_verifier");

//     let body = new URLSearchParams({
//         grant_type: "authorization_code",
//         code: code,
//         redirect_uri: redirectUri,
//         client_id: clientId,
//         code_verifier: codeVerifier,
//     });

//     const hasAccessToken = localStorageMethod.getAccessToken();

//     if (hasAccessToken !== null) return;

//     try {
//         const response = await axios
//             .post(`${import.meta.env.VITE_SPOTIFY_BASE_URL}/api/token`, body, {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             })
//             .then((res) => res.data);
//         console.log(response);
//         localStorageMethod.setAccessToken(response.access_token);
//         localStorageMethod.setRefreshToken(response.refresh_token);
//         localStorageMethod.setExpireTime(response.expires_in);
//     } catch (error) {
//         console.log(error);
//         if (error.response) {
//             console.log(
//                 "response recieved from server but greater than 200",
//                 error.response
//             );
//         }
//         if (error.request) {
//             console.log("request made but no response", error.request);
//         }
//         console.log(error.message);
//         console.log(error.config);
//     }
// };

// export async function refreshToken() {
//     const refreshToken = localStorageMethod.getRefreshToken();

//     let body = new URLSearchParams({
//         grant_type: "refresh_token",
//         refresh_token: refreshToken,
//         clientId: import.meta.env.VITE_CLIENT_ID,
//     });

//     try {
//         const response = await axios
//             .post(`${import.meta.env.VITE_SPOTIFY_BASE_URL}/api/token`, body, {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//             })
//             .then((res) => res.data);
//         console.log(response);
//         localStorageMethod.setAccessToken(response.access_token);
//         localStorageMethod.setRefreshToken(response.refresh_token);
//         localStorageMethod.setExpireTime(response.expires_in);
//     } catch (error) {
//         console.log(error);
//         if (error.response) {
//             console.log(
//                 "response recieved from server but greater than 200",
//                 error.response
//             );
//         }
//         if (error.request) {
//             console.log("request made but no response", error.request);
//         }
//         console.log(error.message);
//         console.log(error.config);
//     }
// }
