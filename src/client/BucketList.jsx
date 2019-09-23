import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './styles/styles.scss';

import LandingPage from './pages/LandingPage';

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
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);

