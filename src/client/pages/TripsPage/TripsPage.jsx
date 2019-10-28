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
import axios from 'axios';

import APIS from '../../constants/apis';

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

  deleteTrip(trip) {
    console.log('Trip to delete is ', trip);

    return axios
      .request({
        url: APIS.trip(trip.trip_id),
        method: 'delete',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function (response) {
        if (response.data.tripsDeleted === 1) {
          location.reload();
        } else {
          alert('You are not authorized to delete this trip');
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('platform');
          instance.routeChange(PATHS.login);
          return;
        }
        alert(error.message);
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
    } else {
      const { trips } = this.state;
      if (trips.length === 0) {
        return (
          <div className="trips-page">
            <div className="top-bar">
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
              <div className="icon" onClick={() => this.routeChange(PATHS.tutorial)}>
                <span className="add">+</span>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="trips-page">
            <div className="top-bar">
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
                  onDelete={() => this.deleteTrip(trip)}
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
