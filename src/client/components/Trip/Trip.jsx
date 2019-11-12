import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import PATHS from '../../constants/paths';
import ProfileButton from '../../buttons/ProfileButton';
import IconButton from '../../buttons/IconButton';

const Trip = props => {
  const { trip, userId, showModal, onClick, onDelete } = props;
  let { trip_id, trip_name, destination, start_date, end_date, members } = trip;
  if (!members) {
    members = [];
  }
  members = members.filter((member) => !member.isSelf);

  function renderMemberPhoto(user) {
    return (
      <div className="member-photo">
       { user.profile_photo
         ? (<img src={user.profile_photo}></img>)
         : <ProfileButton />
       }
      </div>
    );
  }

  function renderMemberPhotos() {
    if (members.length <= 4) {
      return members.map(renderMemberPhoto);
    } else {
      return members.slice(0, 3).map(renderMemberPhoto).concat([
        <div className="member-photo">
          <IconButton className="extra-members-photo" icon={"+" + (members.length - 3)} />
        </div>
      ]);
    }
  }

  function renderMemberFirstName(user) {
    return user.name
      ? user.name.split(' ')[0]
      : "";
  }


  function renderMemberNames() {
    const memberNames = members.length <= 4
      ? members.map(renderMemberFirstName)
      : members.slice(0, 3).map(renderMemberFirstName).concat([
        (members.length - 3) + " more"
      ]);
    return [memberNames.slice(0, -1).join(', '), memberNames.slice(-1)[0]].join(memberNames.length < 2 ? '' : ' & ')
  }

  function decodePromisified() {
    return new Promise(function(resolve, reject) {
      jwt.verify(token, secret, resolve)
    })
  }

  function formatDateRange(startDate, endDate) {
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

  return (
    <div className="trip row">
      <div className="trip-element trip-img" onClick={onClick}>
        <img src={`../../../../assets/trips/${destination.toLowerCase()}.png`} alt={destination}/>
      </div>
      <div className="trip-element trip-details" onClick={onClick}>
        <span className="trip-name">{trip_name}</span>
        <span className="trip-dest">{destination}</span>
        <span className="trip-dates">{formatDateRange(start_date, end_date)}</span>
        <div className="trip-members">
          <div className="photos">{renderMemberPhotos()}</div>
          <div className="names">{renderMemberNames()}</div>
        </div>
      </div>
      <div className="trip-element delete-button" onClick={onDelete}>
        <span></span>
      </div>
      <div className="trip-element right-icon" onClick={onClick}>
        <FontAwesomeIcon icon={ faChevronRight }></FontAwesomeIcon>
      </div>
    </div>
  );
};

export default Trip;
