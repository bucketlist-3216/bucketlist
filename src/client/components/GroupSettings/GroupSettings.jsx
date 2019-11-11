import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';

import TripFriend from '../../components/TripFriend';
import AddFriendModal from '../../components/AddFriendModal';

@autoBindMethods
class GroupSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      isModalShown: false
    };
  }

  render() {
    const { parent } = this.props;
    const { tripId } = parent.props.match.params;
    const { isModalShown } = this.state;
    let anonCounter = 1;

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
        <div className="friends-container">
          <div className="add-friend" onClick={() => this.setState({ isModalShown: true })}>
            <div className="add-button">
              <span>+</span>
            </div>
            <div className="add-text">
              <span>Add Friends</span>
            </div>
          </div>
          {parent.state.tripFriends.map((tripFriend, key) => (
            <TripFriend
              tripFriend={tripFriend}
              anonCounter={anonCounter}
              isAdminShown={true}
              key={key}
            />
          ))}
        </div>
        {/* <div className="bottom-bar">
          <button className="link-button">
            <span>
              copy sharing link
            </span>
          </button>
        </div> */}
        <AddFriendModal
          isModalShown={isModalShown}
          closeModal={this.closeModal}
          tripId={tripId}
        />
      </div>
    );
  }

  // Helper function
  closeModal() {
    this.setState({ isModalShown: false });
  }
}

export default GroupSettings;
