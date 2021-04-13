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

var stateKey = 'spotify_auth_state';
var client_id = 'f5c12e204437479da9efa53d9109b6ca'; // Your client id
var redirect_uri = 'http://localhost:3000'; // Your redirect uri

require('./routes')(app, stateKey, client_id, redirect_uri);


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);