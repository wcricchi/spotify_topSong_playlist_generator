const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var request = require('request');



const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino).use(cors())
  .use(cookieParser());

app.use(express.static(path.join(__dirname, 'build')));


var stateKey = 'spotify_auth_state';
var client_id = 'f5c12e204437479da9efa53d9109b6ca'; // Your client id
if (process.env.NODE_ENV === 'production') {
  var redirect_uri = 'http://localhost:3001';
} else {
   redirect_uri = 'http://localhost:3001'; // Your redirect uri
}

require('./routes')(app, stateKey, client_id, redirect_uri);

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3001, () =>
  console.log('Express server is running on localhost:3001')
);

module.exports = app;
