import React from 'react';
import ProfileButton from '../../buttons/ProfileButton';

class PlaceListTopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick } = this.props;
    return (
      <div className="top-bar">
        <div className="top-bar-button">
          <ProfileButton onClick={onClick}/>
        </div>
        <div className = "title">
          {this.props.destination}
        </div>
        {/*<div className="place-list-top-bar-export-btn">
          <img src="../../../../assets/common/icon-export.png"></img>
        </div>*/}
      </div>
    );
  }
}

export default PlaceListTopBar;
