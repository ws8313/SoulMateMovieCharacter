import React from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={ MainPage } />
    </div>
  );
}

export default App;
