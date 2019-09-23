import React from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage'

const BucketList = () => {
  return (
    <Switch>
      <Route exact path='/' component={LandingPage} />
    </Switch>
  )
};

export default BucketList;
