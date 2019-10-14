import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

// Style imports
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import paths
import PATHS from './constants/paths';

// Import views for router
import Login from './pages/Login';
import CreateTrip from './pages/CreateTrip';
import CitySelect from './pages/CitySelect';
import SwipeView from './pages/SwipeView';

ReactGA.initialize('UA-148749594-1');
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={PATHS.home} component={Login} />
      <Route exact path={PATHS.login} component={Login} />
      <Route exact path={PATHS.createTrip} component={CreateTrip} />
      <Route exact path={PATHS.citySelect} component={CitySelect} />
      <Route exact path={PATHS.swipe} component={SwipeView} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);
