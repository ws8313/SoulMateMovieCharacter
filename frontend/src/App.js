import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import TestPage from './pages/TestPage';
import TestCompletedPage from './pages/TestCompletedPage';
import MbtiCharacterPage from './pages/MbtiCharacterPage';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ LoginPage } />
        <Route path="/TestPage" component={ TestPage } />
        <Route path="/TestCompletedPage" component={ TestCompletedPage } />
        <Route path="/MainPage" component={ MainPage } />
        <Route path="/RegisterPage" component={ RegisterPage } />
        <Route path="/MbtiCharacterPage" component={ MbtiCharacterPage } />
      </Switch>
    </div>
  );
}

export default App;
