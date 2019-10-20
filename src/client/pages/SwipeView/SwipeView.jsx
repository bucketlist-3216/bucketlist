import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator'

import Swipe from "../../components/Swipe";

@autoBindMethods
class SwipeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="swipe-view">
        <Swipe {...this.props}/>
      </div>
    );
  }
}

export default SwipeView;
