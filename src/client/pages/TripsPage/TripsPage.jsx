import React, { Component } from "react";

import axios from 'axios'

import Header from "../../components/Header";
import Trip from "../../components/Trip";

class TripsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: []
    };
  }

  componentDidMount() {
    // TODO: check that logged in user === owner of the trips, otherwise deny access
    let instance = this;
    const userId = this.props.match.params.userId;
    axios
      .get(`http://localhost:3001/api/v1/user/${userId}/trips`)
      .then(function (response) {
        instance.setState({trips:response.data});
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  render() {
    if (this.state.trips.length > 0) {
      console.log(this.state.trips);
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
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default TripsPage;
