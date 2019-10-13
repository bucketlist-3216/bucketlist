import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

// Style imports
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import paths
import PATHS from './constants/paths';

// Import views for router
import Home from './pages/Home';
import CreateTrip from './pages/CreateTrip';
import CitySelect from './pages/CitySelect';

ReactGA.initialize('UA-148749594-1');
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={PATHS.home} component={Home} />
      <Route exact path={PATHS.createTrip} component={CreateTrip} />
      <Route exact path={PATHS.citySelect} component={CitySelect} />
      {/* <Route exact path={PATHS.landingPage} component={Home} /> */}
      {/* <Route path={PATHS.createTrip()} component={CreateView} />
      <Route path={PATHS.swipe()} component={SwipeView} />
      <Route path={PATHS.trips()} component={TripsPage} />
      <Route path={PATHS.list()} component={ListPage} /> */}
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);

// Install a service worker if allowed in browser
if ('serviceWorker' in navigator) {
  const registration = runtime.register();
}

