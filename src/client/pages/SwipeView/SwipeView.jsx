import React, { Component } from "react";
import Header from "../../components/Header";
import Swipe from "../../components/Swipe";

class SwipeView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <Swipe />
      </div>
    );
  }
}

export default SwipeView;
