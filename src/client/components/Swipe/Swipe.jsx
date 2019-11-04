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
import ProfileButton from '../../buttons/ProfileButton';
import ListButton from '../../buttons/ListButton';
import Img from 'react-image';
import { LoopingRhombusesSpinner, PixelSpinner } from 'react-epic-spinners';
import TutorialPopup from '../TutorialPopup';
import getUserData from "../../api/user.js";

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
      tutorial: localStorage.getItem('tutorial') || 'false',
      numOfListRenders: 0,
      emptyListTillRefresh: false,
      lastVoted: '',
      name: '',
      username: '',
      profilePictureLink: '',
      listNotif: false,
    };
  }

  componentDidMount() {
    const placeId = this.props.location.state
      ? this.props.location.state.placeId
      : null;
    this.getPlacesToSwipe(placeId);
    this.getCity(this.props.match.params.tripId);
    getUserData(this, localStorage.getItem("userId")).then(() => {
      //console.log(this.state.userData[0])
      let {username, name, profile_photo} = this.state.userData[0];
      this.setState({
        name: name,
        username: username,
        profilePictureLink: profile_photo ? profile_photo : '../../../../assets/common/user-icon.png',
      });
    });
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

        if (instance.state.swipeList === 2) {
          //console.log(response.data['attractions'][0])
          //console.log(instance.state.lastVoted)
          if (response.data['attractions'][0] == instance.state.lastVoted) {
            instance.setState({ places: response.data['attractions'].slice(1, response.data['attractions'].length)});
          } else {
            instance.setState({ places: response.data['attractions']});
          }
          //instance.setState({ places: response.data['attractions']});
        } else {
          if (response.data['food'][0] == instance.state.lastVoted) {
            instance.setState({ places: response.data['food'].slice(1, response.data['food'].length)});
          } else {
            instance.setState({ places: response.data['food']});
          }
          //instance.setState({ places: response.data['food']});
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

    this.setState({ numOfListRenders: this.state.numOfListRenders + 1})
  }

  castVote(place) {

    return swipeDirection => {
      console.log(this.state.listNotif)
      if (!this.state.listNotif) {
        this.setState({ listNotif: true });
      }
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
      this.setState({ lastVoted: place})
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
      var numOfImgs = this.state.places[0].images.length;
      var imgIdx = this.state.imageIndex;
      if (value === "previous") {
        imgIdx = ((((imgIdx - 1) % numOfImgs) + numOfImgs) % numOfImgs);
      } else {
        imgIdx = (imgIdx + 1) % numOfImgs;
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

    // Hack. TODO: Need better way to show the overlay of tutorial and page
    if (this.state.tutorial === 'true') {
      return (
        <div className="swipe-container" style={{ top : "-90%"}}>
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
    return (
      <div className="swipe-container">
        <Swipeable
          buttons={this.renderButtons}
          onSwipe={this.castVote(currentPlace)} onAfterSwipe={this.nextCard}
          renderResult={renderResult} setRenderResult={this.setRenderResult}
        >
          <SwipeCard place={currentPlace} setPlaceData={this.setPlaceData} setShowInfo={this.setShowInfo} 
            imageIndex={imageIndex} imageChange={this.imageChange} setInitialScreenX={this.setInitialScreenX} 
            renderResult={renderResult} imageIndex={imageIndex} numOfImgs={this.state.places[0].images.length} />
          <InfoPanel place={currentPlace} showInfo={showInfo} setShowInfo={this.setShowInfo}/>
        </Swipeable>
        {places.length > 1 && <SwipeCard zIndex={-1} place={places[1]} imageIndex={0} />}
      </div>
    );
  }

  renderSwipeComplete(listBuffer) {
    if (this.state.initialSetup === false) {
      if (listBuffer.attractions.length > 0 || listBuffer.food.length > 0) {
        this.setState({ initialSetup: true });
      }
    }
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

  handleTutorialFinish() {
    this.setState({tutorial: 'false'});
    localStorage.setItem('tutorial', 'false');
  }

  renderTutorial(zIndex = 2000) {
    console.log('Rendering the tutorial');
    return (
      <TutorialPopup onFinish={this.handleTutorialFinish.bind(this)} style={{ zIndex }}/>
    )
  }
  /* This method waits for 20 render times to register the last location card's voteCount() effect.
     It then calls getPlacesToSwipe() and continuously render for 30 times to display an updated location list. */
  bufferRender(places, emptyListTillRefresh, numOfListRenders) {
    if (places.length < 1) {
      if (!emptyListTillRefresh) {
        if (numOfListRenders < 25) {
          this.setState({ numOfListRenders: this.state.numOfListRenders + 1});
          if (numOfListRenders > 20) {
            this.getPlacesToSwipe();
            this.setState({ emptyListTillRefresh: true});
          }
        }
      } else {
        if (numOfListRenders < 50) {
          this.setState({ numOfListRenders: this.state.numOfListRenders + 1});
        } 
      }
    }

    if (places.length > 0 && numOfListRenders > 0) {
      this.setState({ numOfListRenders : 0 });
      this.setState({ emptyListTillRefresh: false});
    }
  }

  render() {
    const { places, isLoading, city, swipeList, sideDrawerOpen, listBuffer, numOfListRenders, emptyListTillRefresh,
      profilePictureLink, name, username } = this.state;
    const { tripId } = this.props.match.params;
    const zIndex = 200;

    this.bufferRender(places, emptyListTillRefresh, numOfListRenders);

    if (places.length > 0 && numOfListRenders > 0) {
      this.setState({ numOfListRenders : 0 });
      this.setState({ emptyListTillRefresh: false});
    }

    return (
      <div className="swipe">
        {sideDrawerOpen && 
          <Backdrop backdropClickHandler={this.backdropClickHandler} /> 
        }
        <SideDrawer 
          sideDrawerOpen={sideDrawerOpen} 
          drawerToggleClickHandler={this.drawerToggleClickHandler}
          routeChange={this.routeChange}
          name={name}
          username={username}
          profilePictureLink={profilePictureLink}
        />
        <div className="swipe-header">
          <div className="swipe-header-left">
            <ProfileButton
              imgSrc={profilePictureLink}
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
          <div className="swipe-header-right">
            <div className="city">
              {"list"}
            </div>
            { this.state.listNotif &&
              <div className="swipe-list-notif">
              </div>
            }
            <div className="swipe-list-button"
              onClick={() => this.routeChange(PATHS.list(tripId))}>
                {"list"}
            </div>
          </div>

        </div>
        {
          (this.state.tutorial === 'true') &&
          this.renderTutorial(zIndex)                                              
        }
        { (places.length > 0 || listBuffer.attractions > 0 || listBuffer.food > 0) 
          ? this.renderSwiping() : this.renderSwipeComplete()}
      </div>
    );
  }
}

export default Swipe;
