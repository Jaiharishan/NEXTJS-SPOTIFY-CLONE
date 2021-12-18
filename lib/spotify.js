import SpotifyWebApi from 'spotify-web-api-node';


// SCOPES ARE USER PERMISSIONS WHICH WE GET WHEN THE USER LOGIN

//  THESE ARE PRESET SPOTIFY PERMISSIONS GIVEN BY THEM
const scopes = [
    "user-read-email",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-email",
    "streaming",
    "user-read-private",
    "user-library-read",
    // "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-follow-read",
].join(',');



const params = {
    scope: scopes
}

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENTID,
    clientSecret:process.env.CLIENTSECRET,
})


export default spotifyApi;
export {LOGIN_URL}