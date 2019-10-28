import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';

import TripFriend from '../../components/TripFriend';

@autoBindMethods
class GroupSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  render() {
    const { parent } = this.props;
    return (
      <div className="group-settings">
        <div className="top-bar">
          <button className="close icon-button" onClick={() =>
            parent.setState({ isManagingGroup: false })
          }>
            <span></span>
          </button>
          <h1 className="title">Manage Group</h1>
          <span className="edit">{
            this.state.isEditing
            ? "done"
            : "edit"
          }
          </span>
        </div>
        <div className="add-friend">
          <div className="add-button" onClick={() => this.routeChange(PATHS.citySelect())}>
            <span>+</span>
          </div>
          <span>Add Members</span>
        </div>
        <div className="friends-container">
          {parent.state.tripFriends.map((tripFriend, key) => (
            <div className="row">
              <TripFriend
                tripFriend={tripFriend}
                isAdminShown={true}
                key={key}
              />
            </div>
          ))}
        </div>
        <div className="bottom-bar">
          <button className="link-button">
            <span>
              copy sharing link
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default GroupSettings;
