import React, { Component } from "react";
import ReactGA from 'react-ga';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import Header from "../../components/Header";
import Preloader from "../../components/Preloader";
import Title from "../../components/Title";
import Trip from "../../components/Trip";

class TripsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      isDoneFetching: false,
      isLoading: true
    };

    this.routeChange = this.routeChange.bind(this);
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  componentDidMount() {
    let instance = this;
    const userId = this.props.match.params.userId;
    axios
      .request({
        url: APIS.userTrips(userId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function (response) {
        instance.setState({ trips: response.data });
        instance.setState({ isDoneFetching: true });
        instance.setState({ isLoading: false });
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.landingPage());
          return;
        }
        alert(error.message);
      });
    this.setState({ isLoading: true });
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (this.state.isLoading) {
      return (<Preloader />);
    } else if (this.state.isDoneFetching) {
      return (
        <div className="trips-page">
          <div className="header-container">
            <Header />
          </div>
          <Title text="Upcoming Trips" />
          <div className="trips-container">
            {this.state.trips.map((trip, key) => (
              <Trip
                key={key}
                trip={trip}
                userId={this.props.match.params.userId}
                history={this.props.history}
              />
            ))}
            <div className="trip" onClick={() => this.routeChange(PATHS.createTrip(this.props.match.params.userId))}>
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
