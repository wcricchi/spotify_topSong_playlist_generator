const fs = require('fs');
const path = require('path');

module.exports = (app, stateKey, client_id, redirect_uri) => {
  // API routes
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app, stateKey, client_id, redirect_uri);
  });
};