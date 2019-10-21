import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator'

import Tutorial from "../../components/Tutorial";


@autoBindMethods
class TutorialPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="swipe-view">
        <Tutorial history={this.props.history} />
      </div>
    );
  }
}

export default TutorialPage;