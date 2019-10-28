import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';

// Import components
import TripFriend from '../../components/TripFriend';
import Preloader from '../../components/Preloader';

// Import api
import TripFriendAPI from '../../api/trip-friend';

import PATHS from '../../constants/paths';

@autoBindMethods
class TripDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tripFriends: []
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    TripFriendAPI.getTripFriends(this, this.props.tripId);
  }

  render() {
    if (this.state.isLoading) {
      return <Preloader />;
    }

    return (
      <div className="trip-details">
        { this.state.tripFriends.length === 0
          ? (
            <div className="trip-friends trip-friends-empty">
              <span className="trip-friends-empty-text">No friends on this trip yet!</span>
            </div>
          )
          : (
            <div className="trip-friends trip-friends-filled">
              <span className="trip-friends-filled-text">Friends on this trip:</span>
              <div className="trip-friends-list">
                {this.state.tripFriends.map((tripFriend, key) =>
                  <TripFriend tripFriend={tripFriend} key={key} />
                )}
              </div>
            </div>
          )
        }
        <div className="trip-buttons">
          <div className="manage-group">
            <span>Manage Group</span>
          </div>
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
