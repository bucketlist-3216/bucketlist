import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './styles/styles.scss';

import CreateView from './pages/CreateView';
import LandingPage from './pages/LandingPage';
import SwipeView from './pages/SwipeView';

// const BucketList = () => {
//   return (
//     <Switch>
//       <Route exact path='/' component={LandingPage} />
//     </Switch>
//   )
// };

// export default BucketList;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path='/createview' component={CreateView} />
      <Route path='/swipeview' component={SwipeView} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);

