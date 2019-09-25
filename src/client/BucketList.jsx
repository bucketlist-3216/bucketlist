import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import './styles/styles.scss';

import PATHS from './constants/paths';

import CreateView from './pages/CreateView';
import LandingPage from './pages/LandingPage';
import SwipeView from './pages/SwipeView';
import TripsPage from './pages/TripsPage';
import ListPage from './pages/ListPage';

ReactGA.initialize('UA-148749594-1');
ReactGA.pageview(window.location.pathname + window.location.search)

// const BucketList = () => {
//   return (
//     <Switch>
//       <Route exact path='/' component={LandingPage} />
//     </Switch>
//   )
// };

// export default BucketList;


// function initializeReactGA() {
//   ReactGA.initialize('UA-148749594-1');
//   ReactGA.pageview('/homepage');
// }

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={PATHS.landingPage()} component={LandingPage} />
      <Route path={PATHS.createTrip()} component={CreateView} />
      <Route path={PATHS.swipe()} component={SwipeView} />
      <Route path={PATHS.trips()} component={TripsPage} />
      <Route path={PATHS.list()} component={ListPage} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);
