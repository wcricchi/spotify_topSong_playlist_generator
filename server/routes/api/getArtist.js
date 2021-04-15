var SpotifyWebApi = require('spotify-web-api-node');

module.exports = (app, stateKey, client_id, redirect_uri) => {
    
    var spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        redirectUri: redirect_uri
    });

    app.get('/api/getArtist', (req, res) => {

        let artist = req.query.artist
        let token = req.query.token

        async function searchArtists() {
            spotifyApi.setAccessToken(token)
            spotifyApi.searchArtists(artist).then(
                function (data) {
                    let artistArray = data.body.artists.items
                    res.send(artistArray)
                },
                function (err) {
                    console.error(err);
                }
            )
        };

        searchArtists()


    });
}