import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';

import PATHS from '../../constants/paths';

@autoBindMethods
class CreateTrip extends Component {
  constructor(props) {
    super (props);

    this.state = {
      isLoading: false
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  setLoading(isLoading) {
    this.setState({ isLoading });
  }

  render() {
    var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
    var ga_info = "CreateTripPage" + "_" + user_id + "_" + new Date().toLocaleString();

    ReactGA.initialize('UA-148749594-1');
    ReactGA.event({
      category: 'User',
      action: 'Viewed Create Trip Page',
      label: ga_info,
    });

    return (
      <div className="create-trip" >
      	<span className="title">Create a Trip</span>
      	<div className="icon" onClick={() => this.routeChange(PATHS.citySelect())}>
    			<span className="add">+</span>
      	</div>
      </div>
    );
  }
}

export default CreateTrip;
