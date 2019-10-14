import React from 'react';

class PlaceListTopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="place-list-top-bar">
        <div className="place-list-top-bar-back-button">
          <img src="../../../../assets/common/icon-backarrow.png"></img>
        </div>
        <div className = "place-list-top-bar-title">
          {this.props.destination}
        </div>
        <div className="place-list-top-bar-export-btn">
          <img src="../../../../assets/common/icon-export.png"></img>
        </div>
      </div>
    );
  }
}

export default PlaceListTopBar;