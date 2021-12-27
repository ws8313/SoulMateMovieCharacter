import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import MainPage from './components/MainPage';
import TestPage from './components/TestPage';
import TestCompletedPage from './components/TestCompletedPage'


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ MainPage } />
        <Route path="/TestPage" component={ TestPage } />
        <Route path="/TestCompletedPage" component={ TestCompletedPage } />
      </Switch>
    </div>
  );
}

export default App;
