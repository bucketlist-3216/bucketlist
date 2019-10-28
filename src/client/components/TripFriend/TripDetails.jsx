import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';

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
    TripFriendAPI.getTripFriends(this);
  }

  render() {
    if (this.state.isLoading) {
      return <Preloader />;
    }

    return (
      <div className="trip-details">
        <div className="trip-friends">
          { this.state.tripFriends.length === 0
            ? (
              <div className="trip-friends-empty">
                <span>No friends on this trip yet!</span>
              </div>
            )
            : (
              <div className="trip-friends-filled">
                <span>Friends on this trip:</span>
                <br />
                {this.state.tripFriends.map((tripFriend, key) =>
                  <TripFriend tripFriend={tripFriend} key={key} />
                )}
              </div>
            )
          }
        </div>
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

  setLoading(isLoading) {
    this.setState({ isLoading });
  }
}

export default TripDetails;
