import React from 'react';
import autoBindMethods from 'class-autobind-decorator';
import ProfileButton from '../../buttons/ProfileButton';

@autoBindMethods
class PlaceListTopBar extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDateRange(startDate, endDate) {
    const endOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    const startOptions = Object.assign({}, endOptions);
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    if (startDate.getFullYear() === endDate.getFullYear()) {
      delete startOptions.year;
    }
    return startDate.toLocaleDateString('default', startOptions) + " - "
        + endDate.toLocaleDateString('default', endOptions);
  }

  render() {
    const { trip, placeCount, onClick } = this.props;
    const {trip_name, destination, start_date, end_date} = trip;
    return (
      <div className="top-bar">
        <ProfileButton onClick={onClick}/>
        <div className = "title">
          <span className="trip-name">{trip_name}</span>
          <span className="trip-dest-dates">{destination} | {this.formatDateRange(start_date, end_date)}</span>
          <div className="place-count">
            <span className="icon"></span>
            <span className="text">{placeCount} places</span>
          </div>
        </div>
        {/*<div className="place-list-top-bar-export-btn">
          <img src="../../../../assets/common/icon-export.png"></img>
        </div>*/}
      </div>
    );
  }
}

export default PlaceListTopBar;
