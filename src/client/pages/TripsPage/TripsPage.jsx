import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faPlus } from '@fortawesome/free-solid-svg-icons'

// Import api
import TripAPI from '../../api/trip';

import PROVIDERS from '../../constants/providers';
import PATHS from '../../constants/paths';

import SingleSignOnButton from '../../components/SingleSignOnButton';
import Preloader from "../../components/Preloader";
import Title from "../../components/Title";
import Trip from "../../components/Trip";
import LogoutButton from "../../buttons/LogoutButton";
import ProfileBanner from "../../components/Trip/ProfileBanner";

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
    var user_id = localStorage.getItem('userId') ? localStorage.getItem('userId') : 'undefined';
    var ga_info = "TripsPage" + "_" + user_id + "_" + new Date().toLocaleString();

    ReactGA.initialize('UA-148749594-1');
    ReactGA.event({
      category: 'User',
      action: 'Viewed Trips Page',
      label: ga_info,
    });

    if (this.state.isLoading) {
      return (<Preloader />);
    } else if (localStorage.getItem('platform') === 'jwt') {
      const {trips} = this.state;
      if (trips.length === 0) {
        this.routeChange(PATHS.citySelect());
      } else {
        this.routeChange(PATHS.list(trips[0]['trip_id']));
      }
      return null;
    } else { //Logged in as proper user
      const { trips } = this.state;
      let tripsContainer = ""
      let createTripContainer = ""
      if (trips.length > 0) {
        tripsContainer = (
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
        );
      } else {
        tripsContainer = (
          <div className="trips-container-empty">
            <div className="no-trips-text">
              <span>No trips yet, create one now!</span>
            </div>
            <div className="icon" onClick={() => this.routeChange(PATHS.tutorial)}>
              <span className="add">+</span>
            </div>
          </div>
        )
      }
      if (!(localStorage.getItem("platform") === 'jwt' && trips.length>0)) {
        createTripContainer = (
          <div className="add-trip-container">
            <label className="add" onClick={() => this.routeChange(PATHS.citySelect())}>Create New Trip</label>
          </div>
        );
      }
      if (trips.length === 0) {
        return (
          <div className="trips-page">
            {/* <div className="top-bar">
              {localStorage.getItem('platform') === 'jwt'
              ? <SingleSignOnButton
                  providerName={PROVIDERS['google'].providerName}
                  logo={PROVIDERS['google'].logo}
                  setLoading={(isLoading) => this.setState({ isLoading })}
                  onLoginSuccess={() => TripAPI.getTrips(this)}
                />
              : <LogoutButton routeChange={this.routeChange}/>
              }
              <h1 className="title">Trips</h1>
            </div> */}
            <ProfileBanner tripCount={trips.length} routeChange={this.routeChange}/>
            {tripsContainer}
            {createTripContainer}
          </div>
        );
      } else {
        return (
          <div className="trips-page">
            {/* <div className="top-bar">
              {localStorage.getItem('platform') === 'jwt' ?
                <SingleSignOnButton
                  providerName={PROVIDERS['google'].providerName}
                  logo={PROVIDERS['google'].logo}
                  setLoading={(isLoading) => this.setState({ isLoading })}
                  onLoginSuccess={() => TripAPI.getTrips(this)}
                /> :
                <LogoutButton routeChange={this.routeChange}/>
              }
              <h1 className="title">Trips</h1>
            </div> */}
            <ProfileBanner tripCount={trips.length} routeChange={this.routeChange}/>
            {tripsContainer}
            {createTripContainer}
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
