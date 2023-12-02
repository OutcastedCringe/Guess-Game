export default class musicSide {
    startAPI(){
    window.onSpotifyWebPlaybackSDKReady = () => {
        const token = 'YOUR_SPOTIFY_API_TOKEN'; // Replace with your Spotify API token
      
        // Create a new instance of Spotify Player
        const player = new Spotify.Player({
          name: 'Web Playback SDK',
          getOAuthToken: (callback) => {
            callback(token);
          },
        });
} 
player.connect();
   }
}

