import React from 'react';
import HomeButton from '../../buttons/HomeButton';

class PlaceListTopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick } = this.props;
    return (
      <div className="top-bar">
        <HomeButton onClick={onClick}/>
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
