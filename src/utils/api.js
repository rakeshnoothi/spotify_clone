import axiosInstance from "./axiosInstance";

const makeRequest = async (url, method) => {
    const config = { url: url, method: method };
    try {
        const response = await axiosInstance(config);
        console.log("response from making request", response);
        return response;
    } catch (error) {
        console.log("error from making request", error);
        return Promise.reject(error);
    }
};

export const getCurrentUserProfile = () => makeRequest("/v1/me", "get");

export const getCurrentUserPlaylist = userId =>
    makeRequest(`/v1/users/${userId}/playlists`, "get");
