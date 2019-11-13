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
import ProfileBanner from "../../components/ProfileBanner";

import APIS from '../../constants/apis';

@autoBindMethods
class TripsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trips: [],
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
    const instance = this;
    TripAPI.getTrips(this.routeChange)
      .then(function (response) {
        instance.setState({
          trips : response.data,
          isLoading: false
        });
      })
      .catch(function (error) {
        alert(error.message);
      });
  }

  handleDelete(tripId) {
    const isConfirmed = window.confirm('Are you sure you wish to delete this trip?');
    if (!isConfirmed) {
      return;
    }
    TripAPI.deleteTrip(this.routeChange, tripId)
      .then(function (response) {
        if (response.data.tripsDeleted === 1) {
          location.reload();
        } else {
          toast('You are not authorized to delete this trip', {
            type: 'error',
            autoClose: 4000,
            position: toast.POSITION.BOTTOM_CENTER,
            hideProgressBar: true,
          });
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('platform');
          instance.routeChange(PATHS.login);
          return;
        }
        toast(`Oops! Something went wrong.`, {
          type: 'error',
          autoClose: 4000,
          position: toast.POSITION.BOTTOM_CENTER,
          hideProgressBar: true,
        });
      });
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
        this.routeChange(PATHS.createTrip());
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
                  onDelete={() => this.handleDelete(trip.trip_id)}
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
          </div>
        )
      }
      if (!(localStorage.getItem("platform") === 'jwt' && trips.length>0)) {
        createTripContainer = (
          <div className="add-trip-container">
            <label className="add" onClick={() => this.routeChange(PATHS.createTrip())}>Create New Trip</label>
          </div>
        );
      }
      if (trips.length === 0) {
        localStorage.setItem('tutorial', 'true');
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
            </div>
            <div className="trips-container-empty">
              <div className="no-trips-text">
                <span>No trips yet, create one now!</span>
              </div>
              <div className="icon" onClick={() => this.routeChange(PATHS.createTrip())}>
                <span className="add">+</span>
              </div>
            </div>
            </div> */}
            <ProfileBanner tripCount={trips.length} routeChange={this.routeChange}/>
            {tripsContainer}
            {createTripContainer}
          </div>
        );
      } else {
        localStorage.setItem('tutorial', 'false');
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
