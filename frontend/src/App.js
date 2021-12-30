import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainPage from './pages/MainPage';
import TestPage from './pages/TestPage';
import TestExPage from './pages/TestExPage';
import TestCompletedPage from './pages/TestCompletedPage'





function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ MainPage } />
        <Route path="/TestPage" component={ TestPage } />
        <Route path="/TestExPage" component={ TestExPage } />
        <Route path="/TestCompletedPage" component={ TestCompletedPage } />
      </Switch>
    </div>
  );
}

export default App;
