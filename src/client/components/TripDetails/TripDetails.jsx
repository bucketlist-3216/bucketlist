import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';

// Import components
import TripFriend from '../../components/TripFriend';
import Spinner from '../../components/Spinner';

import PATHS from '../../constants/paths';

@autoBindMethods
class TripDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { parent } = this.props;

    return (
      <div className="trip-details">
        { parent.state.tripFriends.length <= 1
          ? (
            <div className="trip-friends trip-friends-empty">
              <span className="trip-friends-empty-text">No friends on this trip yet!</span>
            </div>
          )
          : (
            <div className="trip-friends trip-friends-filled">
              <span className="trip-friends-filled-text">Friends on this trip:</span>
              <div className="trip-friends-list">
                {parent.state.tripFriends.map((tripFriend, key) =>
                  !tripFriend.is_self && <TripFriend tripFriend={tripFriend} key={key} />
                )}
              </div>
            </div>
          )
        }
        <div className="trip-buttons">
          <button className="trip-button" onClick={() =>
            parent.setState({ isManagingTrip: true })
          }>
            <span>Manage Trip</span>
          </button>
          <button className="trip-button" onClick={() =>
            parent.setState({ isManagingGroup: true })
          }>
            <span>Manage Group</span>
          </button>
        </div>
      </div>
    );
  }

  // helper functions
  routeChange(pathname) {
    this.props.history.push({
      pathname
    });
  }
}

export default TripDetails;
