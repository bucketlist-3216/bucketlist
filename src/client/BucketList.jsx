import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactGA from 'react-ga';
import { Workbox } from "workbox-window";

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
      <Route exact path={PATHS.landingPage()} component={LandingPage} />
      <Route path={PATHS.createTrip()} component={CreateView} />
      <Route path={PATHS.swipe()} component={SwipeView} />
      <Route path={PATHS.trips()} component={TripsPage} />
      <Route path={PATHS.list()} component={ListPage} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);

if ("serviceWorker" in navigator) {
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