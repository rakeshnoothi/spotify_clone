import axiosInstance from "./axiosInstance";

const makeRequest = async (url, method) => {
    const config = { url: url, method: method };
    try {
        const response = await axiosInstance(config);
        return response;
    } catch (error) {
        return Promise.reject(error);
    }
};

//returs promise responses.
const getCurrentUserProfile = () => makeRequest("/v1/me", "get");
const getCurrentUserPlaylist = () => makeRequest("/v1/me/playlists", "get");
const getCurrentUserArtists = () =>
    makeRequest("/v1/me/following?type=artist", "get");
const getCurrentUserAlbums = () => makeRequest("/v1/me/albums");
const getCurrentUserFeatured = () =>
    makeRequest("/v1/browse/featured-playlists?country=IN&limit=10");
const getCurrentUserRecentlyPlayed = () =>
    makeRequest("/v1/me/player/recently-played?limit=10");

const fetchFunctions = {
    getCurrentUserProfile,
    getCurrentUserPlaylist,
    getCurrentUserArtists,
    getCurrentUserAlbums,
    getCurrentUserFeatured,
    getCurrentUserRecentlyPlayed,
};

export default fetchFunctions;
