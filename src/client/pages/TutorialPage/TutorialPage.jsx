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
    var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
    var ga_info = "TutorialPage" + "_" + user_id + "_" + new Date().toLocaleString();

    ReactGA.initialize('UA-148749594-1');
    ReactGA.event({
      category: 'User',
      action: 'Viewed Tutorial Page',
      label: ga_info,
    });

    return (
      <div className="tutorial-page">
        <Tutorial history={this.props.history} />
      </div>
    );
  }
}

export default TutorialPage;