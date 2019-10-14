import React, { Component } from "react";
import ReactGA from 'react-ga';
import autoBindMethods from 'class-autobind-decorator';
import _ from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight, faPlus } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

import APIS from '../../constants/apis';
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
    let instance = this;
    const userId = this.props.match.params.userId;
    instance.setState({ trips: [
            {
              "destination": "Singapore",
              "tripId": 1
            },
            {
              "destination": "Singapore",
              "tripId": 1
            },
            {
              "destination": "Singapore",
              "tripId": 1
            },
            {
              "destination": "Singapore",
              "tripId": 1
            }
          ] });
    instance.state.isDoneFetching = true;
    // axios
    //   .request({
    //     url: APIS.userTrips(userId),
    //     method: 'get',
    //     headers: {
    //       token: localStorage.getItem('token'),
    //       platform: localStorage.getItem('platform')
    //     }
    //   })
    //   .then(function (response) {
    //     instance.setState({ trips: [
    //       {
    //         "destination": "singapore",
    //         "tripId": 1
    //       }
    //     ] });
    //     instance.setState({ isDoneFetching: true });
    //     instance.setState({ isLoading: false });
    //   })
    //   .catch(function (error) {
    //     if (error.response && error.response.status === 401) {
    //       instance.routeChange(PATHS.landingPage);
    //       return;
    //     }
    //     alert(error.message);
    //   });
    // this.setState({ isLoading: true });
  }

  render() {
    ReactGA.initialize('UA-148749594-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
    if (false) {
      return (<Preloader />);
    } else if (this.state.isDoneFetching) {

      return (
        <div className="trips-page">
          <div className="top-bar">
            <h1 className="title">Trips</h1>
            {/* <h2 className="title">Trips</h2> */}
            {/* <FontAwesomeIcon className="pinned-right" icon={ faChevronCircleRight }></FontAwesomeIcon> */}
          </div>
          <div className="trips-container shadow">
            {this.state.trips.map((trip, key) => (
              <Trip
                key={key}
                trip={trip}
                userId={this.props.match.params.userId}
                history={this.props.history}
                showModal={this.showModal}
              />
            ))}
          </div>
          <div className="add" onClick={() => this.routeChange(PATHS.createTrip(this.props.match.params.userId))}>
              <div className="new-trip">
                <FontAwesomeIcon icon={faPlus} size="2x"/>
                <br/>
              </div>
            </div>
        </div>
      );
    } else {
      return null;
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
