import React from 'react';

class PlaceListTopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick } = this.props;
    return (
      <div className="top-bar">
        <div className="home-button" onClick={onClick}>
          <span></span>
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
