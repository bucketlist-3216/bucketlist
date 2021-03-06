import React, { Component } from 'react';
import autoBindMethods from 'class-autobind-decorator';

import TripFriend from '../../components/TripFriend';
import AddFriendModal from '../../components/AddFriendModal';

@autoBindMethods
class GroupSettings extends Component {
  constructor(props) {
    super(props);

    let counter = 1;
    this.tripFriendsList = _.map(this.props.parent.state.tripFriends, e => {
      return e;
    })

    this.state = {
      isEditing: false,
      isModalShown: false,
      anonCounter: 1
    };
  }

  render() {
    const { parent } = this.props;
    const { tripId } = parent.props.match.params;
    const { isModalShown } = this.state;

    return (
      <div className="group-settings-parent">
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
          {this.tripFriendsList.map((tripFriend, key) => {

            return (<TripFriend
              tripFriend={tripFriend}
              isAdminShown={true}
              key={key}
            />);
          })}
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
      </div>
    );
  }

  // Helper function
  closeModal() {
    this.setState({ isModalShown: false });
  }
}

export default GroupSettings;
