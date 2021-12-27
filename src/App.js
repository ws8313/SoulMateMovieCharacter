import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import MainPage from './components/MainPage';
import TestPage from './components/TestPage';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ MainPage } />
        <Route path="/TestPage" component={ TestPage } />
      </Switch>
    </div>
  );
}

export default App;
