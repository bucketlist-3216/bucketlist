import React, { Component } from 'react';
import Swipeable from 'react-swipy';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';
import EmptyCard from './EmptyCard';
import PlaceInfo from './PlaceInfo/';
import BackButton from '../BackButton';
import Preloader from '../Preloader';

@autoBindMethods
class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
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
  }

  // Helper function for redirecting
  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }

  // Helper functions to communicate with backend

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
        if (error.response.status == 401) {
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
          if (error.esponse.status == 401) {
            instance.routeChange(PATHS.landingPage);
            return;
          }
          alert(error.message);
        });
    };
  }

  // Helper function for modal

  showModal(event) {
    this.setState({ isModalShown: true });
  }

  closeModal(event) {
    this.setState({ isModalShown: false });
  }

  // Helper functions for swiping

  nextCard = () => {
    const { places } = this.state;
    if (places.length > 0) {
      const newPlaces = places.slice(1, places.length);
      this.setState({ places: newPlaces });
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
          <SwipeCard place={currentPlace} showModal={this.showModal} />
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
    const { places, isLoading } = this.state;
    const { userId, tripId } = this.props.match.params;
    const currentPlace = places[0];

    if (isLoading) return null;

    return (
      <div className="swipe">
        {places.length > 0 && (
          <div>
            {/* <PlaceInfo place={places[0]} state={this.state} closeModal={this.closeModal}/> */}
            {this.renderModal(places[0].place_id)}
            <div className="swipe-header">
              <BackButton
                onClick={() => {
                  this.routeChange(PATHS.trips(userId));
                }}
              />
              <div className="city">{places[0].city || ''}</div>
              <img
                className="icon-list"
                src="/assets/common/icon-list.png"
                onClick={() => {
                  this.routeChange(PATHS.list(userId, tripId));
                }}
              />
            </div>
            <div className="place-name">
              <span>{places[0].name || ''}</span>
            </div>
          </div>
        )}
        {this.state.hasNext ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }

  renderModal(placeId) {
    const { isModalShown } = this.state;
    const isMobile = window.innerWidth < 555;
    return (
      <PlaceInfo
        isModalShown={isModalShown}
        closeModal={this.closeModal}
        isMobile={isMobile}
        placeId={placeId}
      />
    );
  }
}

export default Swipe;