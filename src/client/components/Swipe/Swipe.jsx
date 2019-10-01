import React, { Component } from 'react';
import Swipeable from 'react-swipy';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';
import EmptyCard from './EmptyCard';
import PlaceInfo from '../PlaceInfo/';
import BackButton from '../BackButton';
import Preloader from '../Preloader';

@autoBindMethods
class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      places: [],
      placeData: {},
      hasNext: true,
      isLoading: true,
      isModalShown: false
    };
  }

  componentDidMount() {
    const placeId = this.props.location.state
      ? this.props.location.state.placeId
      : null;
    this.getPlacesToSwipe(placeId);
    this.getCity(this.props.match.params.tripId);
  }

  // Helper function for redirecting
  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  // Helper functions to communicate with backend
  getCity(tripId) {
    const instance = this;

    axios
      .request({
        url: APIS.trip(tripId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        }
      })
      .then(function(response) {
        instance.setState({ city: response.data.destination });
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          instance.routeChange(PATHS.landingPage);
          return;
        }
        alert(error.message);
      });
  }

  getPlacesToSwipe(placeId) {
    this.setState({ isLoading: true });

    const { tripId, userId } = this.props.match.params;
    const instance = this;

    axios
      .request({
        url: APIS.placesToVote(tripId, userId),
        method: 'get',
        headers: {
          token: localStorage.getItem('token'),
          platform: localStorage.getItem('platform')
        },
        params: { placeId }
      })
      .then(function(response) {
        if (response.data.length == 0) {
          instance.setState({ hasNext: false });
        }
        instance.setState({ places: response.data });
        instance.setState({ isLoading: false });
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.landingPage);
          return;
        }
        alert(error.message);
      });
  }

  castVote(place) {
    return swipeDirection => {
      const { tripId, userId } = this.props.match.params;
      const instance = this;
      const vote = {
        left: 'DISLIKE',
        right: 'LIKE'
      };

      axios
        .request({
          url: APIS.vote,
          method: 'post',
          headers: {
            token: localStorage.getItem('token'),
            platform: localStorage.getItem('platform')
          },
          data: {
            vote: vote[swipeDirection],
            user_id: userId,
            trip_id: tripId,
            place_id: place.place_id
          }
        })
        .catch(function (error) {
          if (error.esponse.status === 401) {
            instance.routeChange(PATHS.landingPage);
            return;
          }
          alert(error.message);
        });
    };
  }

  // Helper function to set state

  showModal(placeId) {
    this.setState({ isModalShown: true });
  }

  closeModal(event) {
    this.setState({ isModalShown: false });
  }

  setPlaceData(placeData) {
    this.setState({ placeData });
  }

  // Helper functions for swiping

  nextCard = () => {
    const { places } = this.state;
    if (places.length > 0) {
      const newPlaces = places.slice(1, places.length);
      this.setState({ places: newPlaces });
      this.setState({ placeData: {} });
    } else {
      this.getPlacesToSwipe();
    }
  };

  renderSwiping() {
    const { places } = this.state;
    const currentPlace = places[0];
    return (
      <div className="swipe-container">
        <Swipeable
          buttons={this.renderButtons}
          onSwipe={this.castVote(currentPlace)}
          onAfterSwipe={this.nextCard}
        >
          <SwipeCard place={currentPlace} setPlaceData={this.setPlaceData} showModal={this.showModal} />
        </Swipeable>
        {places.length > 1 && <SwipeCard zIndex={-1} place={places[1]} />}
      </div>
    );
  }

  renderSwipeComplete() {
    return (
      <div className="swipe-container">
        <EmptyCard zIndex={-2}>No more cards</EmptyCard>
      </div>
    );
  }

  renderButtons({ left, right }) {
    return (
      <div className="swipe-buttons">
        <SwipeButton onClick={left} type="reject" />
        <SwipeButton onClick={right} type="approve" />
      </div>
    );
  }

  render() {
    const { places, isLoading, city } = this.state;
    const { userId, tripId } = this.props.match.params;

    if (isLoading) return null;

    return (
      <div className="swipe">
        <div className="swipe-header">
          <BackButton
            onClick={() => this.routeChange(PATHS.trips(userId))}
          />
          <div className="city">{city}</div>
          <img
            className="icon-list"
            src="/assets/common/icon-list.png"
            onClick={() => this.routeChange(PATHS.list(userId, tripId))}
          />
        </div>
        {places.length > 0 && (
          <div>
            {this.renderModal()}
            <div className="place-name">
              <span>{places[0].name || ''}</span>
            </div>
          </div>
        )}
        {places.length > 0 ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }

  renderModal() {
    const { isModalShown, placeData } = this.state;
    const isMobile = window.innerWidth < 555;
    return (
      <PlaceInfo
        isModalShown={isModalShown}
        closeModal={this.closeModal}
        isMobile={isMobile}
        placeData={placeData}
      />
    );
  }
}

export default Swipe;
