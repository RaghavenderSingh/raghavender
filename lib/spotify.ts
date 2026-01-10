
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const access_token_direct = process.env.SPOTIFY_ACCESS_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
    // if (access_token_direct) {
    //     return { access_token: access_token_direct };
    // }

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token!,
        }),
    });

    return response.json();
};

export const getNowPlaying = async () => {
    // Check if we have *either* a direct token OR the full refresh setup
    const hasDirectToken = !!access_token_direct;
    const hasRefreshSetup = client_id && client_secret && refresh_token;

    if (!hasDirectToken && !hasRefreshSetup) {
        console.error("Spotify credentials missing. Please check .env file.");
        return null;
    }

    const { access_token } = await getAccessToken();

    return fetch(NOW_PLAYING_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: {
            revalidate: 30 // Cache for 30s
        }
    });
};

export const getTopTracks = async () => {
    const hasDirectToken = !!access_token_direct;
    const hasRefreshSetup = client_id && client_secret && refresh_token;

    if (!hasDirectToken && !hasRefreshSetup) {
        return null;
    }

    const { access_token } = await getAccessToken();

    return fetch(TOP_TRACKS_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: {
            revalidate: 3600 // Cache for 1 hour
        }
    });
};

const getClientCredentialsToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
        }),
    });

    return response.json();
};

export const getArtistTopTracks = async (artistId: string) => {
    // Use Client Credentials flow for public data (more reliable)
    const { access_token } = await getClientCredentialsToken();
    const AC_DC_ENDPOINT = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`;

    return fetch(AC_DC_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: {
            revalidate: 86400 // Cache for 24 hours
        }
    });
};

export const searchTracks = async (query: string) => {
    const { access_token } = await getClientCredentialsToken();
    const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=50`;

    return fetch(SEARCH_ENDPOINT, {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        next: {
            revalidate: 86400 // Cache for 24 hours
        }
    });
};
