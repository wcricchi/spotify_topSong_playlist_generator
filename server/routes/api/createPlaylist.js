var SpotifyWebApi = require('spotify-web-api-node');

module.exports = (app, stateKey, client_id, redirect_uri) => {


    var spotifyApi = new SpotifyWebApi({
        clientId: client_id,
        redirectUri: redirect_uri
    });

    app.post('/api/createPlaylist', (req, res) => {
        let token = req.query.token
        console.log(req.body)
        let name = req.body.playlistData.name
        let options =
        {
            'description': req.body.playlistData.description,
            'collaborative': false,
            'public': false
        }

        async function createPlaylist() {
            spotifyApi.setAccessToken(token)
            return new Promise(function (resolve, reject) {
                spotifyApi.createPlaylist(name, options).then(
                    function (data) {
                        console.log(data.body)
                        resolve(data.body.id)
                    },
                    function (err) {
                        throw new Error(err)
                    }
                )
            })
        }

        async function addSongs() {
            let playlistID = await createPlaylist()
            spotifyApi.addTracksToPlaylist(
                playlistID,
                req.body.songs.uris
            ).then(
                function (data) {
                    console.log(data.body)
                    res.send(data)
                },
                function (err) {
                    console.error(err);
                }
            )
        };


        addSongs()


    });
}