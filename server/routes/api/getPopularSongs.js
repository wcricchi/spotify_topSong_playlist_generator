var SpotifyWebApi = require('spotify-web-api-node');


module.exports = (app, stateKey, client_id, redirect_uri) => {

    var spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        redirectUri: redirect_uri
    });


    app.get('/api/getPopularSongs', (req, res) => {

        let artistID = req.query.artistID
        let token = req.query.token

        async function getTopTracks() {
            spotifyApi.setAccessToken(token)
            spotifyApi.getArtistTopTracks(artistID, 'US').then(
                function (data) {
                    let songArray = data.body.tracks
                    res.send(songArray)
                },
                function (err) {
                    console.error(err);
                }
            )
        };

        getTopTracks()


    });

}