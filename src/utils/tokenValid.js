function isTokenExpired(tokenReceivedDate, expirationSeconds = 3600) {
    const currentDateInSeconds = Math.floor(Date.now() / 1000);
    const expirationTimeInSeconds = tokenReceivedDate + expirationSeconds;
    if (currentDateInSeconds > expirationTimeInSeconds) {
        return true;
    } else {
        return false;
    }
}

export default isTokenExpired;
