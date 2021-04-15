var SpotifyWebApi = require('spotify-web-api-node');

module.exports = (app) => {
    var spotifyApi = new SpotifyWebApi({
        clientId: 'f5c12e204437479da9efa53d9109b6ca',
        redirectUri: 'http://localhost:3000'
    });

    app.get('/api/getArtist', (req, res) => {

        let artist = req.query.artist
        let token = req.query.token
       
        async function searchArtists(){
          spotifyApi.setAccessToken(token)
          spotifyApi.searchArtists(artist).then(
            function (data) {
                let artistArray = data.body.artists.items
                res.send(artistArray)
            },
            function (err) {
                console.error(err);
            }
        )};

        searchArtists()

       
    });
}