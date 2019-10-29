import React, { Component } from 'react';
import Swipeable from './Swipeable/Swipeable';
import autoBindMethods from 'class-autobind-decorator';
import axios from 'axios';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

import APIS from '../../constants/apis';
import PATHS from '../../constants/paths';
import SwipeCard from './SwipeCard/';
import SwipeButton from './SwipeButton';
import EmptyCard from './EmptyCard';
import InfoPanel from './InfoPanel';
import SideDrawer from '../SideDrawer/';
import Backdrop from '../Backdrop/';
import HomeButton from '../../buttons/HomeButton';
import ListButton from '../../buttons/ListButton';
import Img from 'react-image';
import { LoopingRhombusesSpinner, PixelSpinner } from 'react-epic-spinners';

@autoBindMethods
class Swipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      city: 'Singapore',
      listBuffer: {
        attractions: [],
        food: []
      },
      places: [],
      placeData: {},
      swipeList: 1,
      hasNext: true,
      showInfo: false,
      imageIndex: 0,
      initialScreenX: 0,
      previousType: 1,
      renderResult: '',
      initialSetup: false,
      sideDrawerOpen: false,
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

    const { tripId } = this.props.match.params;
    const instance = this;

    axios
      .request({
        url: APIS.placesToVote(tripId),
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
        instance.setState({ listBuffer: response.data });
        if (instance.swipeList === 1) {
          instance.setState({ places: response.data['attractions']});
        } else {
          instance.setState({ places: response.data['food']});
        }
        instance.setState({ isLoading: false });
      })
      .catch(function (error) {
        if (error.response && error.response.status === 401) {
          instance.routeChange(PATHS.login);
          return;
        }
        alert(error.message);
      });
  }

  castVote(place) {
    return swipeDirection => {
      const { tripId } = this.props.match.params;
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
            trip_id: tripId,
            place_id: place.place_id
          }
        })
        .catch(function (error) {
          if (error.response.status == 401) {
            instance.routeChange(PATHS.login);
            return;
          }
          alert(error.message);
        });
    };
  }

  // Helper function to set state

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen }
    });
  }

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  }

  setShowInfo(showInfo) {
    this.setState({ showInfo: showInfo });
  }

  setPlaceData(placeData) {
    this.setState({ placeData });
  }

  setInitialScreenX(value) {
    this.setState({ initialScreenX: value });
  }

  setRenderResult(value) {
    if (this.state.renderResult !== value) {
      this.setState({ renderResult: value });
    }
  }

  setSwipeList(value) {
    this.setState({ imageIndex: 0 });
    this.setState({ swipeList: value });
  }

  imageChange(screenX, value) {
    const delta = Math.abs(screenX - this.state.initialScreenX);
    if (delta < 10) {
      var imgIdx = this.state.imageIndex;
      if (value === "previous") {
        imgIdx = Math.max(0, imgIdx - 1);
      } else {
        imgIdx = Math.min(this.state.places[0].images.length - 1, imgIdx + 1);
      }
      this.setState({ imageIndex: imgIdx });
    }
  }

  // Helper functions for swiping

  nextCard = () => {
    const { places } = this.state;
    this.setState({ imageIndex: 0 });
    this.setState({ renderResult: '' });
    if (places.length > 0) {
      const newPlaces = places.slice(1, places.length);
      this.setState({ places: newPlaces });
      this.setState({ placeData: {} });
    } else {
      this.getPlacesToSwipe();
    }
  };

  renderSwiping() {
    const { places, imageIndex, showInfo, renderResult, initialSetup } = this.state;
    const currentPlace = places[0];
    if (this.state.initialSetup === false) {
      this.setState({ initialSetup: true });
    }

    return (
      <div className="swipe-container">
        <Swipeable
          buttons={this.renderButtons}
          onSwipe={this.castVote(currentPlace)} onAfterSwipe={this.nextCard}
          renderResult={renderResult} setRenderResult={this.setRenderResult}
        >
          <SwipeCard place={currentPlace} setPlaceData={this.setPlaceData} setShowInfo={this.setShowInfo} 
            imageIndex={imageIndex} imageChange={this.imageChange} setInitialScreenX={this.setInitialScreenX} 
            renderResult={renderResult} />
          <InfoPanel place={currentPlace} showInfo={showInfo} setShowInfo={this.setShowInfo}/>
        </Swipeable>
        {places.length > 1 && <SwipeCard zIndex={-1} place={places[1]} imageIndex={0} />}
      </div>
    );
  }

  renderSwipeComplete() {
    return (
      <div className="swipe-container">
        <div className="center-align">
          <div className="no-card-msg">We're looking for more places</div>
          <Img className="finding-cards-graphic" src={ '__dirname + "../../../../assets/common/adventure.svg' } />

          <br/>
          <LoopingRhombusesSpinner className="finding-cards-spinner" />
        </div>
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

  renderList(swipeList) {
    if (this.state.initialSetup) {
      if (swipeList === 1) {
        if (swipeList !== this.state.previousType) {
          this.state.listBuffer.attractions = this.state.places;
          this.setState({ places : this.state.listBuffer.food });
          this.setState({ previousType : swipeList });
        }
        return (
          <ToggleButtonGroup className="toggle-buttons" name="toggle-button" value={swipeList} onChange={this.setSwipeList}>
            <ToggleButton className="toggle-button-selected" name="food" value={1}>food</ToggleButton>
            <ToggleButton className="toggle-button-unselected" name="places" value={2}>places</ToggleButton>
          </ToggleButtonGroup>
        );
      }
      else {
        if (swipeList !== this.state.previousType) {
          this.state.listBuffer.food = this.state.places;
          this.setState({ places : this.state.listBuffer.attractions });
          this.setState({ previousType : swipeList });
        }
        return (
          <ToggleButtonGroup className="toggle-buttons" name="toggle-button" value={swipeList} onChange={this.setSwipeList}>
            <ToggleButton className="toggle-button-unselected" name="food" value={1}>food</ToggleButton>
            <ToggleButton className="toggle-button-selected" name="places" value={2}>places</ToggleButton>
          </ToggleButtonGroup>
        );
      };
    };
  }

  render() {
    const { places, isLoading, city, swipeList, sideDrawerOpen, listBuffer } = this.state;
    const { tripId } = this.props.match.params;

    return (
      <div className="swipe">
        {sideDrawerOpen && 
          <Backdrop backdropClickHandler={this.backdropClickHandler} /> 
        }
        <SideDrawer 
          sideDrawerOpen={sideDrawerOpen} 
          drawerToggleClickHandler={this.drawerToggleClickHandler}
          routeChange={this.routeChange}
        />
        <div className="swipe-header">
          <div className="swipe-header-sides">
            <HomeButton
              onClick={() => this.drawerToggleClickHandler()}
            />
          </div>
          <div>
            <div className="swipe-header-middle">
              <div className="city">
                {city}
              </div>
              {places.length > -1 && (
                <div className="swipe-header-toggle">
                  {this.renderList(this.state.swipeList)}
                </div>
              )}
            </div>
          </div>
          <div className="swipe-header-sides">
            <ListButton
              onClick={() => this.routeChange(PATHS.list(tripId))}
            />
          </div>
        </div>
        { (places.length > 0 || listBuffer.attractions > 0 || listBuffer.food > 0) 
          ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }
}

export default Swipe;
