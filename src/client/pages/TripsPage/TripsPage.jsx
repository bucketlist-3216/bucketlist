import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faPlus } from '@fortawesome/free-solid-svg-icons'

// Import api
import TripAPI from '../../api/trip';

import PATHS from '../../constants/paths';
import Preloader from "../../components/Preloader";
import Title from "../../components/Title";
import Trip from "../../components/Trip";

@autoBindMethods
class TripsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
      isDoneFetching: false,
      isLoading: true,
      isModalShown: false,
      modalTripId: null
    };
  }

  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    TripAPI.getTrips(this);
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (this.state.isLoading) {
      return (<Preloader />);
    } else {
      const { trips } = this.state;
      if (trips.length === 0) {
        return (
          <div className="trips-page">
            <div className="top-bar">
              <h1 className="title" onClick={() => this.routeChange(PATHS.tutorial)} >Trips</h1>
            </div>
            <div className="trips-container-empty">
              <div className="no-trips-text">
                <span>No trips yet, create one now!</span>
              </div>
              <div className="icon" onClick={() => this.routeChange(PATHS.citySelect())}>
                <span className="add">+</span>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="trips-page">
            <div className="top-bar">
              <h1 className="title" onClick={() => this.routeChange(PATHS.tutorial)} >Trips</h1>
            </div>
            <div className="trips-container">
              {this.state.trips.map((trip, key) => (
                <Trip
                  key={key}
                  trip={trip}
                  userId={this.props.match.params.userId}
                  history={this.props.history}
                  showModal={this.showModal}
                  onClick={() => this.routeChange(PATHS.list(trip['trip_id']))}
                />
              ))}
            </div>
            <div className="add-icon-container">
              <div className="icon" onClick={() => this.routeChange(PATHS.citySelect())}>
                <span className="add">+</span>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  // Helper function for modal

  showModal(tripId) {
    this.setState({
      isModalShown: true,
      modalTripId: tripId
    });
  }

  closeModal(event) {
    this.setState({ isModalShown: false });
  }

  getTripId() {
    return this.state.modalTripId;
  }

  renderModal() {
    const { isModalShown, modalTripId } = this.state;
    return (
      <AddFriendModal
        isModalShown={isModalShown}
        closeModal={this.closeModal}
        tripId={modalTripId}
      />
    );
  }
}

export default TripsPage;
