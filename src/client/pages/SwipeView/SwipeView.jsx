import React, { Component } from "react";
import Header from "../../components/Header";
import Swipe from "../../components/Swipe";

class SwipeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    
    return (
      <div>
        <Header />
        <Swipe />
      </div>
    );
  }
}

export default SwipeView;
