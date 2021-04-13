var SpotifyWebApi = require('spotify-web-api-node');

module.exports = (app) => {
    var spotifyApi = new SpotifyWebApi({
        clientId: 'f5c12e204437479da9efa53d9109b6ca',
        clientSecret: 'c2867477a87a4331bece88de7512e56d',
        redirectUri: 'http://localhost:3000'
    });


    // async function getAccessToken() {
    //     return new Promise(function(resolve, reject) {
    //         request(options, function (error, response) {
    //             if (error) throw new Error(error);
    //             resolve(JSON.parse(response.body).access_token)
    //         });
    //     })
       
    // }
    
    app.get('/api/getArtist', (req, res) => {

        let artist = req.query.artist
        let token = req.query.token
       
        async function searchArtists(){
        //   let accessToken = await getAccessToken()
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