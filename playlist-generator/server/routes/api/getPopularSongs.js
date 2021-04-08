var SpotifyWebApi = require('spotify-web-api-node');
var request = require('request');



module.exports = (app) => {



    var spotifyApi = new SpotifyWebApi({
        clientId: 'f5c12e204437479da9efa53d9109b6ca',
        clientSecret: 'c2867477a87a4331bece88de7512e56d',
        redirectUri: 'http://localhost:3000'
    });

    var options = {
        'method': 'POST',
        'url': 'https://accounts.spotify.com/api/token',
        'headers': {
            'Authorization': 'Basic ZjVjMTJlMjA0NDM3NDc5ZGE5ZWZhNTNkOTEwOWI2Y2E6YzI4Njc0NzdhODdhNDMzMWJlY2U4OGRlNzUxMmU1NmQ=',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'grant_type': 'client_credentials'
        }
    };

    async function getAccessToken() {
        return new Promise(function (resolve, reject) {
            request(options, function (error, response) {
                if (error) throw new Error(error);
                resolve(JSON.parse(response.body).access_token)
            });
        })

    }

    app.get('/api/getPopularSongs', (req, res) => {

        let artistID = req.query.artistID

        async function getTopTracks() {
            let accessToken = await getAccessToken()
            spotifyApi.setAccessToken(accessToken)
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