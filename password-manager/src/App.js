import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MainPage from './containers/MainPage'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        {/* <header className="App-header">
      </header> */}
        <MainPage />
      </div>
    </Router>
  );
}

export default App;
