import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator'

import Header from "../../components/Header";
import Swipe from "../../components/Swipe";

@autoBindMethods
class SwipeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);

    return (
      <div className="swipe-view">
        <Header />
        <Swipe {...this.props}/>
      </div>
    );
  }
}

export default SwipeView;
