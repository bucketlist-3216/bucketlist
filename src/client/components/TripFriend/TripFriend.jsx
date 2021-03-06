import React from 'react';
import Img from 'react-image';

import Spinner from '../../components/Spinner';

const TripFriend = (props) => {
  const { tripFriend, isAdminShown, anonCounter } = props;


  return (
    <div className="trip-friend">
      { tripFriend.profile_photo
        ? (<Img
            src={tripFriend.profile_photo}
            loader={<Spinner />}
            container={children => {
              return <div className="prof-pic prof-pic-filled">{children}</div>
            }}
          />)
        : (
          <div className="prof-pic prof-pic-default icon-button">
            <span></span>
          </div>
        )
      }
      <div className="name">
        <span>{tripFriend.name}</span>
      </div>
      <div className="admin">
        <span>
          {isAdminShown && tripFriend.is_admin && "admin"}
        </span>
      </div>
    </div>
  );
}

export default TripFriend;
