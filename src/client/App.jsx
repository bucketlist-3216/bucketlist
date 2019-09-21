import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import LoginView from './containers/LoginView';
import './styles.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={LoginView} />
    </Switch>
  )
};

export default App;
