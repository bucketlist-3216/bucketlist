import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';

import './styles/styles.scss';

import CreateView from './pages/CreateView';
import LandingPage from './pages/LandingPage';
import SwipeView from './pages/SwipeView';
import TripsPage from './pages/TripsPage';

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
      <Route exact path="/" component={LandingPage} />
      <Route path='/createview' component={CreateView} />
      <Route path='/swipeview' component={SwipeView} />
      <Route path='/user/:userId/trips' component={TripsPage} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);
