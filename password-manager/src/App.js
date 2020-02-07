import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MainPage from './containers/MainPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store'

import {
  BrowserRouter as Router,
} from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          {/* <header className="App-header">
      </header> */}
          <MainPage />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
