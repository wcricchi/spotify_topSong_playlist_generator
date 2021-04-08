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




function App() {
  return (
    <Router>
      <div className="App">  
        <div id="page-body">
          <Switch>
            <Route path="/" component={HomePage} exact />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
