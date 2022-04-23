const API_ENDPOINT = "https://api.spotify.com/v1";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

// function to redirect spotify login API
const getSpotifyAuth = () =>{
  const options = new URLSearchParams({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    redirect_uri : process.env.REACT_APP_BASE_URL,
    response_type :'token',
    scope : [
      'user-read-private',
      'playlist-modify-private',
      'user-read-email',
      'playlist-read-private'
      ],
  }).toString()
  return `${SPOTIFY_AUTHORIZE_ENDPOINT}?${options}`
}

export const authorize = () => {
  window.location.replace(getSpotifyAuth());
}

const getProfile = (accessToken) => {
  return fetch(`${API_ENDPOINT}/me`, {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then(res => res.json())
};

const getSearchTrack = (accessToken, options) => {
  const params = new URLSearchParams(options).toString()
  return fetch(`${API_ENDPOINT}/search?${params}`, {
        headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then(res => res.json())
};

const getUserPlaylist = (accessToken) => {
  return fetch(`${API_ENDPOINT}/me/playlists`, {
    headers: { 'Authorization': 'Bearer ' + accessToken }
  }).then(res => res.json())
};

const createPlaylist = (accessToken, userId, payload) =>{
    return fetch(`${API_ENDPOINT}/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
  }).then(res => res.json())
}

const addTrackToPlaylist = (accessToken, playlistId, payload) => {
    return fetch(`${API_ENDPOINT}/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify(payload)
  }).then(res => res.json())
}

export { 
  getSpotifyAuth, getProfile, 
  getSearchTrack, createPlaylist, 
  addTrackToPlaylist, getUserPlaylist,
};

 