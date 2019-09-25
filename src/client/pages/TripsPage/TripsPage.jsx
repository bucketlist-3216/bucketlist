import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

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
    this.props.history.push('../../createview');
  }

  componentDidMount() {
    // TODO: check that logged in user === owner of the trips, otherwise deny access
    let instance = this;
    const userId = this.props.match.params.userId;
    axios
      .get(`http://localhost:3001/api/v1/user/${userId}/trips`)
      .then(function (response) {
        instance.setState({trips:response.data});
        instance.setState({isDoneFetching:true});
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  render() {
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
