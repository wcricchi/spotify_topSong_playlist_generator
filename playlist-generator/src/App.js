import logo from './logo.svg';
import './App.css';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import HomePage from './pages/HomePage'


const clientId = "f5c12e204437479da9efa53d9109b6ca";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private"
];
export const authEndpoint = 'https://accounts.spotify.com/authorize';

const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

function App() {

  const [token, setToken] = useState(false);


  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      setToken(_token)
    }
  }, [token])


  return (
    <Router>
      <div className="App">
        <div id="page-body">

          {!token && (
            <div className="loginButton">
              <header className="headerText">Welcome to Popular Songs Playlist Generator!</header>
            <a
              className="btn btn-success"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
            </div>
          )}
          <Switch>
            {token && <Route
              path='/'
              render={(props) => (
                <HomePage {...props} token={token} />
              )}
            />}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
