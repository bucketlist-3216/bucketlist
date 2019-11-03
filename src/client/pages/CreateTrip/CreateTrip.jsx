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
        <div className="top-bar">
          <div className="cancel">
            <span>cancel</span>
          </div>
          <div className="save">
            <span>save</span>
          </div>
        </div>
        <div className="cover-photo">
          <span>SINGAPORE</span>
          <div className="overlay"></div>
          <img src="https://place-image.s3-ap-southeast-1.amazonaws.com/progressive/1a9147e4-f3bc-11e9-9da4-f0189856d4a6.jpg"/>
        </div>
        <div className="trip-details">
          <div className="row">
            <div className="field">
              <span>Trip Name</span>
            </div>
            <div className="value">
              <span>Dance Trip Singapore</span>
            </div>
          </div>
          <div className="row">
            <div className="field">
              <span>Location</span>
            </div>
            <div className="value">
              <span>Singapore</span>
            </div>
          </div>
          <div className="row">
            <div className="field">
              <span>Dates</span>
            </div>
            <div className="value">
              <span>26/11/19 - 4/12/19</span>
            </div>
          </div>
        </div>
        <div className="delete-button">
          <div className="icon">
            <span></span>
          </div>
          <div className="text">
            <span>Delete Trip</span>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTrip;
