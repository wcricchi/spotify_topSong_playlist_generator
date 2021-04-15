var SpotifyWebApi = require('spotify-web-api-node');


module.exports = (app) => {

    var spotifyApi = new SpotifyWebApi({
        clientId: 'f5c12e204437479da9efa53d9109b6ca',
        redirectUri: 'http://localhost:3000'
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