import axiosInstance from "./axiosInstance";

const makeRequest = async (url, method) => {
    const config = { url: url, method: method };
    try {
        console.log("making request");
        const response = await axiosInstance(config);
        console.log("response from making request", response);
        return response;
    } catch (error) {
        console.log("error from making request", error);
        return Promise.reject(error);
    }
};

//returs promise responses.
const getCurrentUserProfile = () => makeRequest("/v1/me", "get");
const getCurrentUserPlaylist = () => makeRequest("/v1/me/playlists", "get");
const getCurrentUserArtists = () =>
    makeRequest("/v1/me/following?type=artist", "get");
const getCurrentUserAlbums = () => makeRequest("/v1/me/albums");

const fetchFunctions = {
    getCurrentUserProfile,
    getCurrentUserPlaylist,
    getCurrentUserArtists,
    getCurrentUserAlbums,
};

export default fetchFunctions;
