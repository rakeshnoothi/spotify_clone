const getAccessToken = () => {
    return localStorage.getItem("access_token") || null;
};

const setAccessToken = (value) => {
    localStorage.setItem("access_token", value);
};

const getRefreshToken = () => {
    return localStorage.getItem("refresh_token") || null;
};

const setRefreshToken = (value) => {
    return localStorage.setItem("refresh_token", value);
};

const getExpireTime = () => {
    return localStorage.getItem("expires_in") || null;
};

const setExpireTime = (value) => {
    return localStorage.setItem("expires_in", value);
};

const localStorageMethod = {
    getAccessToken,
    setAccessToken,
    getRefreshToken,
    setRefreshToken,
    getExpireTime,
    setExpireTime,
};

export default localStorageMethod;
