// src/App.js
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UploadFile from './UploadFile';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/upload">Upload File</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/upload">
            <UploadFile />
          </Route>
          <Route path="/">
            <h2>Welcome to the Firebase Web App</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;