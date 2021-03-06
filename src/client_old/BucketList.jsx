import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactGA from 'react-ga';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import './styles/styles.scss';

import PATHS from './constants/paths';

import CreateView from './pages/CreateView';
import LandingPage from './pages/LandingPage';
import SwipeView from './pages/SwipeView';
import TripsPage from './pages/TripsPage';
import ListPage from './pages/ListPage';
import Preloader from './components/Preloader';

ReactGA.initialize('UA-148749594-1');
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={PATHS.landingPage} component={LandingPage} />
      <Route path={PATHS.trips()} component={CreateView} />
      <Route path={PATHS.swipe()} component={SwipeView} />
      <Route path={PATHS.trips()} component={TripsPage} />
      <Route path={PATHS.list()} component={ListPage} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);

// Install a service worker if allowed in browser
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}
