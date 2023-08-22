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
    let scope =
        "user-read-private user-read-email playlist-read-private user-follow-read user-library-read user-read-recently-played";

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

export function logoutUser() {
    localStorage.clear();
    document.location.reload();
}
