import React, { Component } from "react";
import ReactGA from 'react-ga';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import Header from "../../components/Header";
import Trip from "../../components/Trip";

class TripsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      isDoneFetching: false
    };

    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    this.props.history.push(PATHS.createTrip());
  }

  componentDidMount() {
    // TODO: check that logged in user === owner of the trips, otherwise deny access
    let instance = this;
    const userId = this.props.match.params.userId;
    axios
      .get(APIS.user.trips(userId))
      .then(function (response) {
        instance.setState({trips:response.data});
        instance.setState({isDoneFetching:true});
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    
    if (this.state.isDoneFetching) {
      return (
        <div className="trips-page">
          <div className="header-container">
            <Header />
          </div>
          <div className="trips-title">
            <h1>Upcoming Trips</h1>
          </div>
          <div className="trips-container">
            {this.state.trips.map((trip, key) => (
              <Trip
                key={key}
                trip={trip}
              />
            ))}
            <div className="trip" onClick={this.routeChange}>
              <div className="trip-new">
                <FontAwesomeIcon icon={faPlus} size="2x"/>
                <br/>
                <span>
                  Create new trip
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default TripsPage;
