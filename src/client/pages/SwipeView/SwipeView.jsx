import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator'
import PATHS from '../../constants/paths';

import Swipe from "../../components/Swipe";

@autoBindMethods
class SwipeView extends Component {
  constructor(props) {
    super(props);
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  render() {
    if (localStorage.getItem('tutorial')) {
      localStorage.removeItem('tutorial');
      this.routeChange(PATHS.tutorial);
    }

    var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
    var ga_info = "SwipePage" + "_" + user_id + "_" + new Date().toLocaleString();

    ReactGA.initialize('UA-148749594-1');
    ReactGA.event({
      category: 'User',
      action: 'Viewed Swipe Page',
      label: ga_info,
    });

    return (
      <div className="swipe-view">
        <Swipe {...this.props}/>
      </div>
    );
  }
}

export default SwipeView;
