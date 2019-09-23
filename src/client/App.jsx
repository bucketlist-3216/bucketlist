import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import LoginView from './pages/LoginView';
import CreateView from './pages/CreateView';
import './styles.scss';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={LoginView} />
      <Route path='/createview' component={CreateView} />
    </Switch>
  )
};

export default App;
