import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import { Workbox } from "workbox-window";
import { ToastContainer } from 'react-toastify';

// Style imports
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import paths
import PATHS from './constants/paths';

// Import views for router
import Login from './pages/Login';
import PlaceList from './pages/PlaceList';
import CreateTrip from './pages/CreateTrip';
import SwipeView from './pages/SwipeView';
import TripsPage from './pages/TripsPage';
import ListPage from './pages/PlaceList';
import InvitePage from './pages/InvitePage';
import TutorialPage from './pages/TutorialPage';
import ProfilePage from './pages/ProfilePage';

ReactGA.initialize('UA-148749594-1');
ReactGA.pageview(window.location.pathname + window.location.search)

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer />
    <Switch>
      <Route exact path={PATHS.home} component={Login} />
      <Route exact path={PATHS.login} component={Login} />
      <Route exact path={PATHS.trips()} component={TripsPage} />
      {/* <Route exact path={PATHS.appHome} component={SwipeView} /> */}
      <Route exact path={PATHS.createTrip()} component={CreateTrip} />
      <Route exact path={PATHS.swipe()} component={SwipeView} />
      <Route exact path={PATHS.list()} component={ListPage} />
      <Route exact path={PATHS.invite()} component={InvitePage} />
      <Route exact path={PATHS.tutorial} component={TutorialPage} />
      {/* <Route exact path={PATHS.login} component={AppHome} /> */}
      {/* <Route path={PATHS.trips()} component={CreateView} />
      <Route path={PATHS.swipe()} component={SwipeView} /> */}
      <Route exact path={PATHS.profile} component={ProfilePage} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);

if (false && "serviceWorker" in navigator) { //set to false to disable it for now
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");
    const updateButton = document.querySelector("#app-update");
    // Fires when the registered service worker has installed but is waiting to activate.
    wb.addEventListener("waiting", event => {
        updateButton.classList.add("show");
        updateButton.addEventListener("click", () => {
        // Set up a listener that will reload the page as soon as the previously waiting service worker has taken control.
        wb.addEventListener("controlling", event => {
            window.location.reload();
        });
        // Send a message telling the service worker to skip waiting.
        // This will trigger the `controlling` event handler above.
        wb.messageSW({ type: "SKIP_WAITING" });
        });
    });
    wb.register();
  });
};
